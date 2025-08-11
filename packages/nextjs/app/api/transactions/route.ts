import { NextResponse } from "next/server";

export async function GET() {
  const safeAddress = "0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec";

  try {
    // Fetch Safe transactions from Safe Transaction Service
    const safeResponse = await fetch(
      `https://safe-transaction-mainnet.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/?limit=5&offset=0`,
    );

    if (!safeResponse.ok) {
      throw new Error(`Safe API responded with status: ${safeResponse.status}`);
    }

    const safeData = await safeResponse.json();

    if (safeData.results && safeData.results.length > 0) {
      // Process Safe transactions
      const processedTransactions = safeData.results.map((tx: any) => ({
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
        nonce: tx.nonce,
        confirmations: tx.confirmations || [],
        confirmationsRequired: tx.confirmationsRequired,
        isExecuted: tx.isExecuted,
        isSuccessful: tx.isSuccessful,
        // Store the full confirmation details for executor lookup
        confirmationDetails: tx.confirmations || [],
        // Internal transactions will be fetched separately
        internalTransactions: [],
      }));

      // Fetch internal transactions for each Safe transaction
      const transactionsWithInternals = await Promise.all(
        processedTransactions.map(async (tx: any) => {
          try {
            const internalResponse = await fetch(
              `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${tx.hash}&apikey=S1IH9Y6MS44HNJXERBSBZHWX8I5C7VJ4FM`,
            );

            if (internalResponse.ok) {
              const internalData = await internalResponse.json();
              if (internalData.status === "1" && internalData.result) {
                tx.internalTransactions = internalData.result;
              }
            }
          } catch (error) {
            console.error(`Error fetching internal transactions for ${tx.hash}:`, error);
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
