// frontend/src/state/appDefinition.js

/**
 * appDefinition (Empire Edition)
 * ----------------------------------------------------
 * The master neural manifest for the Blue Lotus environment.
 * Hardened for the Monolith Phase and 10% Revenue Actuation.
 */
const appDefinition = {
  id: "blue-lotus-prime",
  name: "BLUE_LOTUS_EMPIRE",
  version: "1.0.0-MONOLITH",
  metadata: {
    architect_fee: 0.10,
    environment: "PROD_CYAN",
  },
  screens: [
    {
      id: "manifest-deck",
      title: "COMMAND_DECK",
      components: [
        {
          id: "header-text-1",
          type: "ActionText",
          props: {
            text: "SYSTEM_INITIALIZED: BLUE_LOTUS_PRIME",
            variant: "header",
          },
        },
        {
          id: "sub-text-1",
          type: "ActionText",
          props: {
            text: "Ready for Neural Ingestion and Site Cloning.",
            variant: "label",
          },
        },
        {
          id: "primary-spacer",
          type: "ActionSpacer",
          props: {
            size: "lg",
          },
        },
        {
          id: "initiate-button",
          type: "ActionButton",
          props: {
            label: "OPEN_STOREFRONT",
            variant: "primary",
            action: "ACTIVATE_MARKETPLACE",
          },
        },
      ],
    },
  ],
};

export default appDefinition;
