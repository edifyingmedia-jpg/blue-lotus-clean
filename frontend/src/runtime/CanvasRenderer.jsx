import React from "react";

/**
 * Static demo app definition.
 * This will later be mutated by TWIN.
 */
const appDefinition = {
  screens: [
    {
      id: "home",
      title: "Home",
      components: [
        {
          type: "Text",
          props: {
            value: "Welcome to Blue Lotus.",
          },
        },
        {
          type: "Text",
          props: {
            value: "This workspace reflects the current app definition.",
          },
        },
        {
          type: "Button",
          props: {
            label: "Primary Action",
          },
        },
      ],
    },
  ],
};

export default function CanvasRenderer() {
  const screen = appDefinition.screens[0];

  return (
    <div style={styles.canvas}>
      <div style={styles.screen}>
        <h1 style={styles.title}>{screen.title}</h1>

        <div style={styles.components}>
          {screen.components.map((component, index) => {
            switch (component.type) {
              case "Text":
                return (
                  <p key={index} style={styles.text}>
                    {component.props.value}
                  </p>
                );

              case "Button":
                return (
                  <button
                    key={index}
                    style={styles.button}
                    disabled
                  >
                    {component.props.label}
                  </button>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  canvas: {
    padding: "32px",
    height: "100%",
    boxSizing: "border-box",
  },
  screen: {
    maxWidth: "720px",
    margin: "0 auto",
    backgroundColor: "#0b0d12",
    border: "1px solid #1f2937",
    borderRadius: "12px",
    padding: "32px",
  },
  title: {
    marginBottom: "24px",
    fontSize: "24px",
    fontWeight: "600",
  },
  components: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  text: {
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#d1d5db",
  },
  button: {
    padding: "12px 16px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "not-allowed",
    opacity: 0.85,
  },
};
