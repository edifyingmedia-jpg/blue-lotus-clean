/**
 * executeProposal.js
 * ----------------------------------------------------
 * Applies an approved proposal to the app definition.
 *
 * RULES:
 * - No interpretation
 * - No AI calls
 * - No side effects
 * - No silent failures
 * - Unknown proposals are rejected
 */

/**
 * @param {object} proposal - Approved proposal from interpretCommand
 * @param {object} appDefinition - Current app definition
 * @returns {object} updated app definition
 */
export default function executeProposal(proposal, appDefinition) {
  if (!proposal || !proposal.type) {
    throw new Error("Invalid proposal");
  }

  switch (proposal.type) {
    case "ADD_COMPONENT": {
      const { component } = proposal;

      if (!component || !component.type || !component.props) {
        throw new Error("Malformed ADD_COMPONENT proposal");
      }

      return {
        ...appDefinition,
        screens: appDefinition.screens.map((screen, index) =>
          index === 0
            ? {
                ...screen,
                components: [
                  ...screen.components,
                  {
                    id: `${component.type.toLowerCase()}-${Date.now()}`,
                    type: component.type,
                    props: component.props,
                  },
                ],
              }
            : screen
        ),
      };
    }

    case "ADD_SCREEN": {
      const { screen } = proposal;

      if (!screen || !screen.title) {
        throw new Error("Malformed ADD_SCREEN proposal");
      }

      return {
        ...appDefinition,
        screens: [
          ...appDefinition.screens,
          {
            id: `screen-${Date.now()}`,
            title: screen.title,
            components: screen.components || [],
          },
        ],
      };
    }

    case "NO_OP":
      return appDefinition;

    default:
      throw new Error(`Unsupported proposal type: ${proposal.type}`);
  }
}
