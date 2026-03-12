import React, { useState, useEffect } from "react";
import { faqApi } from "./api";
import type { FAQ } from "./api";

const DebugFAQ: React.FC = () => {
  const [data, setData] = useState<FAQ[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log("Testing FAQ API...");
        setLoading(true);
        const result = await faqApi.getFAQs();
        console.log("FAQ API Result:", result);
        setData(result);
        setError(null);
      } catch (err) {
        console.error("FAQ API Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h2>FAQ API Debug</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && (
        <div>
          <h3>API Response ({data.length} items):</h3>
          <pre
            style={{ background: "#f5f5f5", padding: "10px", overflow: "auto" }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DebugFAQ;
