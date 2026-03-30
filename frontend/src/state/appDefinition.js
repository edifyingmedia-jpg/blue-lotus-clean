/**
 * appDefinition.js
 * ----------------------------------------------------
 * Single source of truth for the current app structure.
 * This object will be mutated by TWIN in later phases.
 */

const appDefinition = {
  id: "blue-lotus-app",
  name: "Blue Lotus App",
  screens: [
    {
      id: "home",
      title: "Home",
      components: [
        {
          id: "text-1",
          type: "Text",
          props: {
            value: "Welcome to your Blue Lotus app.",
          },
        },
        {
          id: "text-2",
          type: "Text",
          props: {
            value: "This UI is generated from a shared definition.",
          },
        },
        {
          id: "button-1",
          type: "Button",
          props: {
            label: "Primary Action",
          },
        },
      ],
    },
  ],
};

export default appDefinition;
