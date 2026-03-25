// ComponentRegistry.js
// Central registry of all supported component types.

export const COMPONENT_TYPES = {
  text: {
    label: "Text",
    defaultProps: {
      text: "Text"
    }
  },

  button: {
    label: "Button",
    defaultProps: {
      label: "Button"
    }
  },

  image: {
    label: "Image",
    defaultProps: {
      src: ""
    }
  }
};
