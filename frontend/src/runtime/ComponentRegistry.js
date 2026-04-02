// ComponentRegistry.js
// Maps component type names to actual React components for TWIN to render.

import Text from "../components/Text";
import Button from "../components/Button";
import Input from "../components/Input";
import Container from "../components/Container";

const ComponentRegistry = {
  Text,
  Button,
  Input,
  Container
};

export function getComponent(type) {
  return ComponentRegistry[type] || null;
}

export default ComponentRegistry;
