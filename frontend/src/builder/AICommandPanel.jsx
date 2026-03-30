import React, { useState } from "react";
import { useAppDefinition } from "../state/AppDefinitionContext";
import interpretCommand from "../twin/interpretCommand";
import executeProposal from "../twin/executeProposal";

export default function AICommandPanel() {
  const [input, setInput] = useState("");
  const [proposal, setProposal] = useState(null);
  const [error, setError] = useState(null);

  const { appDefinition, setAppDefinition } = useAppDefinition();

  function handleInterpret() {
    setError(null);
    const result = interpretCommand(input);
    setProposal(result);
  }

  function handleApproveAndApply() {
    if (!proposal) return;

    try {
      const updated = executeProposal(proposal, appDefinition);
      setAppDefinition(updated);
      setProposal(null);
      setInput("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={styles.panel}>
      <div style={styles.header}>TWIN</div>

      <div style={styles.body}>
        <div style={styles.instructions}>
          Describe what you want to build.
          <br />
          TWIN will propose changes for your approval.
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: Add a welcome text to the home screen"
          style={styles.textarea}
        />

        <button style={styles.button} onClick={handleInterpret}>
          Interpret Command
        </button>

        {proposal && (
          <div style={styles.proposal}>
            <div style={styles.proposalTitle}>Proposed Action</div>

            <div style={styles.proposalRow}>
              <strong>Type:</strong> {proposal.type}
            </div>

            {proposal.explanation && (
              <div style={styles.proposalRow}>
                <strong>Explanation:</strong> {proposal.explanation}
              </div>
            )}

            {proposal.confidence !== undefined && (
              <div style={styles.proposalRow}>
                <strong>Confidence:</strong>{" "}
                {Math.round(proposal.confidence * 100)}%
              </div>
            )}

            {proposal.type === "UNRECOGNIZED" && (
              <div style={styles.warning}>
                TWIN could not confidently interpret this request.
              </div>
            )}

            {proposal.type !== "UNRECOGNIZED" && (
              <button
                style={styles.approveButton}
                onClick={handleApproveAndApply}
              >
                Approve & Apply
              </button>
            )}
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}

const styles = {
  panel: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#070a10",
    color: "#e5e7eb",
  },
  header: {
    padding: "14px 16px",
    borderBottom: "1px solid #1f2937",
    fontWeight: 600,
    letterSpacing: "0.2px",
  },
  body: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  instructions: {
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: 1.5,
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    resize: "none",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #1f2937",
    backgroundColor: "#0b0d12",
    color: "#e5e7eb",
    fontSize: "13px",
    outline: "none",
  },
  button: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  proposal: {
    marginTop: "12px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: "#0b0d12",
    border: "1px solid #1f2937",
    fontSize: "13px",
  },
  proposalTitle: {
    fontWeight: 600,
    marginBottom: "8px",
  },
  proposalRow: {
    marginBottom: "6px",
  },
  approveButton: {
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  warning: {
    marginTop: "8px",
    color: "#fbbf24",
    fontSize: "12px",
  },
  error: {
    marginTop: "8px",
    color: "#f87171",
    fontSize: "12px",
  },
};
