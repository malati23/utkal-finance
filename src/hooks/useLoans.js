import { useState, useEffect } from 'react';
import { getLoanProducts, getLoanProductBySlug } from '../services/loanService';

export function useLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchLoans() {
      try {
        setLoading(true);
        const data = await getLoanProducts();
        if (isMounted) {
          setLoans(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load loan products');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchLoans();

    return () => {
      isMounted = false;
    };
  }, []);

  return { loans, loading, error };
}

export function useLoanDetail(slug) {
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetail() {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await getLoanProductBySlug(slug);
        if (isMounted) {
          setLoan(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load loan details');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { loan, loading, error };
}
