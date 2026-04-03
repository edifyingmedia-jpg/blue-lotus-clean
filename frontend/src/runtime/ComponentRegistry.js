/**
 * ComponentRegistry.js
 * ----------------------------------------------------
 * Central registry mapping component type strings
 * to the actual primitive React components.
 *
 * This is the modern, stable version aligned with:
 * - rxgui/primitives/*
 * - ComponentRenderer.jsx
 * - ScreenRenderer.component.jsx
 */

import ActionText from "../rxgui/primitives/ActionText.component";
import ActionButton from "../rxgui/primitives/ActionButton.component";
import ActionInput from "../rxgui/primitives/ActionInput.component";
import ActionImage from "../rxgui/primitives/ActionImage.component";
import ActionContainer from "../rxgui/primitives/ActionContainer.component";
import ActionList from "../rxgui/primitives/ActionList.component";
import ActionSpacer from "../rxgui/primitives/ActionSpacer.component";
import ActionDivider from "../rxgui/primitives/ActionDivider.component";
import ActionGroup from "../rxgui/primitives/ActionGroup.component";
import ActionCard from "../rxgui/primitives/ActionCard.component";
import ActionToggle from "../rxgui/primitives/ActionToggle.component";

const registry = {
  text: ActionText,
  button: ActionButton,
  input: ActionInput,
  image: ActionImage,
  container: ActionContainer,
  list: ActionList,
  spacer: ActionSpacer,
  divider: ActionDivider,
  group: ActionGroup,
  card: ActionCard,
  toggle: ActionToggle,
};

export function getComponent(type) {
  return registry[type] || null;
}

export default registry;
