import Text from "../components/primitives/Text";
import Button from "../components/primitives/Button";
import Input from "../components/primitives/Input";
import Container from "../components/primitives/Container";

const registry = {
  Text,
  Button,
  Input,
  Container,
};

export function getComponent(type) {
  return registry[type] || null;
}

export default registry;
