import { NextResponse } from "next/server";

export async function GET() {
  const safeAddress = "0xeF899e80aA814ab8D8e232f9Ed6403A633C727ec";

  try {
    // Fetch Safe transactions from Safe Transaction Service
    const safeResponse = await fetch(
      `https://safe-transaction-mainnet.safe.global/api/v1/safes/${safeAddress}/multisig-transactions/?limit=3&offset=0`,
    );

    if (!safeResponse.ok) {
      throw new Error(`Safe API responded with status: ${safeResponse.status}`);
    }

    const safeData = await safeResponse.json();

    const debugData: {
      safeApiResponse: any;
      processedTransactions: any[];
    } = {
      safeApiResponse: safeData,
      processedTransactions: [],
    };

    if (safeData.results && safeData.results.length > 0) {
      // Process first 3 transactions with full data
      for (let i = 0; i < Math.min(3, safeData.results.length); i++) {
        const tx = safeData.results[i];

        const transactionData = {
          originalSafeData: tx,
          processedData: {
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
            confirmations: tx.confirmations?.length || 0,
            confirmationsRequired: tx.confirmationsRequired,
            isExecuted: tx.isExecuted,
            isSuccessful: tx.isSuccessful,
            // Additional Safe fields
            submissionDate: tx.submissionDate,
            executionDate: tx.executionDate,
            blockNumber: tx.blockNumber,
            transactionHash: tx.transactionHash,
            safeTxGas: tx.safeTxGas,
            baseGas: tx.baseGas,
            // gasPrice already defined above
            gasToken: tx.gasToken,
            refundReceiver: tx.refundReceiver,
            signatures: tx.signatures,
            data: tx.data,
            dataDecoded: tx.dataDecoded,
            internalTransactions: [],
          },
        };

        // Fetch internal transactions for this transaction
        try {
          const internalResponse = await fetch(
            `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${tx.transactionHash}&apikey=S1IH9Y6MS44HNJXERBSBZHWX8I5C7VJ4FM`,
          );

          if (internalResponse.ok) {
            const internalData = await internalResponse.json();
            transactionData.processedData.internalTransactions = internalData;
          }
        } catch (error) {
          console.error(`Error fetching internal transactions for ${tx.transactionHash}:`, error);
        }

        debugData.processedTransactions.push(transactionData);
      }
    }

    return NextResponse.json(debugData);
  } catch (error) {
    console.error("Error fetching debug data:", error);
    return NextResponse.json({ error: "Failed to fetch debug data" }, { status: 500 });
  }
}
