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
      const transactionsWithInternals = await Promise.all(
        processedTransactions.map(async (tx: any) => {
          try {
            // Fetch internal transactions
            const internalResponse = await fetch(
              `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${tx.transactionHash}&apikey=S1IH9Y6MS44HNJXERBSBZHWX8I5C7VJ4FM`,
            );

            if (internalResponse.ok) {
              const internalData = await internalResponse.json();
              if (internalData.status === "1" && internalData.result) {
                tx.internalTransactions = internalData.result;
              }
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

          return tx;
        }),
      );

      return NextResponse.json({ transactions: transactionsWithInternals });
    } else {
      return NextResponse.json({ transactions: [] });
    }
  } catch (error) {
    console.error("Error fetching Safe transactions:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
