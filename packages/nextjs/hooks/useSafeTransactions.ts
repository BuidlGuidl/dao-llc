import { useEffect, useState } from "react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  gasUsed: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  methodId: string;
  functionName: string;
  nonce: number; // Safe transaction nonce
  transactionHash?: string; // Actual Ethereum transaction hash for Etherscan
  actualExecutor?: string; // The person who actually executed the transaction on-chain
  executorType?: "proposer" | "executor" | null; // Whether to show "Proposed by" or "Executed by"
  proposer?: string; // The person who proposed the transaction
  executor?: string; // The person who executed the transaction
}

interface UseSafeTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const useSafeTransactions = (): UseSafeTransactionsReturn => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      // Only run on client side
      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch transactions from our API route
        const response = await fetch("/api/transactions");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.transactions) {
          setTransactions(data.transactions);
        } else {
          setError(data.error || "Failed to fetch transactions");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions");
        // Set empty transactions array to prevent layout issues
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};
