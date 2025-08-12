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
