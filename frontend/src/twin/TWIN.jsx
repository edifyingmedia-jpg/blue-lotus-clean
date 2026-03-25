import { useState, useCallback } from "react";

/**
 * useTWIN
 * Frontend-safe wrapper for calling backend TWIN actions.
 * All privileged logic stays server-side.
 */
export function useTWIN() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callTWIN = useCallback(async (action, payload = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/twin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, payload })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "TWIN request failed");
      }

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { callTWIN, loading, error };
}
