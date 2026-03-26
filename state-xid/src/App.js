import React, { useState } from "react";

export default function App() {
  const [stateCode, setStateCode] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-xid/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ state_code: stateCode })
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.generated_xid);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>SWA XID Generator</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength="2"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value.toUpperCase())}
          placeholder="Enter state code"
        />
        <button type="submit" style={{ marginLeft: "10px" }}>
          Submit
        </button>
      </form>

      {result && <p>Generated SWA XID: {result}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}