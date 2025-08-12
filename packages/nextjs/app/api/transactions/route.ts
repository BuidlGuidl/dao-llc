import { NextResponse } from "next/server";

export async function GET() {
  const safeAddress = "0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec";

  try {
    // Fetch more Safe transactions to ensure we get 5 executed ones after filtering
    const safeResponse = await fetch(
      `https://safe-transaction-mainnet.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/?limit=20&offset=0`,
    );

    if (!safeResponse.ok) {
      throw new Error(`Safe API responded with status: ${safeResponse.status}`);
    }

    const safeData = await safeResponse.json();

    if (safeData.results && safeData.results.length > 0) {
      // Filter to only executed transactions and limit to 5
      const executedTransactions = safeData.results.filter((tx: any) => tx.isExecuted).slice(0, 5);

      // Process executed Safe transactions
      const processedTransactions = executedTransactions.map((tx: any) => ({
        hash: tx.safeTxHash,
        from: tx.safe,
        to: tx.to,
        value: tx.value,
        timeStamp: tx.executionDate,
        gasUsed: tx.gasUsed,
        gasPrice: tx.gasPrice,
        isError: tx.isSuccessful ? "0" : "1",
        txreceipt_status: tx.isSuccessful ? "1" : "0",
        methodId: tx.methodName || "",
        functionName: tx.methodName || "",
        // Safe-specific fields
        safeTxHash: tx.safeTxHash,
        transactionHash: tx.transactionHash, // Actual Ethereum transaction hash for Etherscan
        nonce: tx.nonce,
        confirmations: tx.confirmations || [],
        confirmationsRequired: tx.confirmationsRequired,
        isExecuted: tx.isExecuted,
        isSuccessful: tx.isSuccessful,
        // Store the full confirmation details for executor lookup
        confirmationDetails: tx.confirmations || [],
        // Include origin data for transaction description logic
        origin: tx.origin,
        // Include decoded data for parsing transaction details
        dataDecoded: tx.dataDecoded,
        // Include proposer and executor fields from Safe API
        proposer: tx.proposer,
        executor: tx.executor,
        // Will be set based on proposer/executor fields
        actualExecutor: null,
        // Internal transactions will be fetched separately
        internalTransactions: [],
      }));

      // Fetch internal transactions and executor for each Safe transaction
      // Process sequentially to respect Etherscan rate limit (5 calls/sec)
      const transactionsWithInternals = [];

      for (const tx of processedTransactions) {
        try {
          // Fetch internal transactions with retry logic - only if we have a transaction hash
          if (tx.transactionHash) {
            console.log(`Fetching internal transactions for ${tx.nonce} (${tx.transactionHash})`);

            // Rate limiting: Wait 200ms between calls (max 5/sec)
            await new Promise(resolve => setTimeout(resolve, 200));

            // Retry logic for Etherscan API (reduce retries since we're rate limiting)
            let retries = 2;
            let success = false;

            while (retries > 0 && !success) {
              try {
                // Create AbortController for timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000);

                const internalResponse = await fetch(
                  `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${tx.transactionHash}&apikey=S1IH9Y6MS44HNJXERBSBZHWX8I5C7VJ4FM`,
                  {
                    signal: controller.signal,
                  },
                );

                clearTimeout(timeoutId);

                if (internalResponse.ok) {
                  const internalData = await internalResponse.json();
                  console.log(`Etherscan response for nonce ${tx.nonce} (attempt ${4 - retries}):`, {
                    status: internalData.status,
                    message: internalData.message,
                    resultCount: internalData.result ? internalData.result.length : 0,
                  });

                  if (internalData.status === "1" && internalData.result) {
                    tx.internalTransactions = internalData.result;
                    success = true;
                  } else {
                    console.warn(`No internal transactions for nonce ${tx.nonce}:`, internalData.message);
                    tx.internalTransactions = [];
                    success = true; // Don't retry if API says no results
                  }
                } else {
                  console.error(
                    `Etherscan API failed for nonce ${tx.nonce} (attempt ${4 - retries}):`,
                    internalResponse.status,
                    internalResponse.statusText,
                  );
                  retries--;
                  if (retries > 0) {
                    console.log(`Retrying in 500ms... (${retries} attempts left)`);
                    await new Promise(resolve => setTimeout(resolve, 500));
                  } else {
                    tx.internalTransactions = [];
                  }
                }
              } catch (error) {
                console.error(`Etherscan API error for nonce ${tx.nonce} (attempt ${4 - retries}):`, error);
                retries--;
                if (retries > 0) {
                  console.log(`Retrying in 500ms... (${retries} attempts left)`);
                  await new Promise(resolve => setTimeout(resolve, 500));
                } else {
                  tx.internalTransactions = [];
                }
              }
            }
          } else {
            console.warn(`No transaction hash for nonce ${tx.nonce}, skipping internal transactions`);
            tx.internalTransactions = [];
          }

          // For Safe transactions, prioritize proposer, fallback to executor
          if (tx.proposer && typeof tx.proposer === "string" && tx.proposer.trim() !== "") {
            tx.actualExecutor = tx.proposer;
            tx.executorType = "proposer"; // Flag to show "Proposed by"
          } else if (tx.executor && typeof tx.executor === "string" && tx.executor.trim() !== "") {
            tx.actualExecutor = tx.executor;
            tx.executorType = "executor"; // Flag to show "Executed by"
          } else {
            // If neither proposer nor executor, hide the line
            tx.actualExecutor = null;
            tx.executorType = null;
          }
        } catch (error) {
          console.error(`Error fetching transaction data for ${tx.transactionHash}:`, error);
        }

        transactionsWithInternals.push(tx);
      }

      return NextResponse.json({ transactions: transactionsWithInternals });
    } else {
      return NextResponse.json({ transactions: [] });
    }
  } catch (error) {
    console.error("Error fetching Safe transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
