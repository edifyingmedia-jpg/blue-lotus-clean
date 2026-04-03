import React from "react";
import ActionEngine from "../../runtime/ActionEngine";

export default function ActionVideo({
  src = "",
  action = null,
  params = {},
  width = "100%",
  height = "auto",
  margin = "0 0 12px 0",
  controls = true,
  borderRadius = 6,
}) {
  const handleAction = () => {
    if (!action) return;

    try {
      const engine = new ActionEngine({});
      engine.run(action, params);
    } catch (err) {
      console.error("ActionVideo error:", err);
    }
  };

  return (
    <video
      src={src}
      controls={controls}
      onClick={action ? handleAction : undefined}
      style={{
        width,
        height,
        margin,
        borderRadius,
        cursor: action ? "pointer" : "default",
        display: "block",
      }}
    />
  );
}
