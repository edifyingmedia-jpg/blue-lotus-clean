// frontend/src/components/ComponentRegistry.js
import Button from "./Button";
import Card from "./Card";
// Import the new primitives
import View from "./primitives/View";
import Text from "./primitives/Text";
import Input from "./primitives/Input";
import Image from "./primitives/Image";
import Spacer from "./primitives/Spacer";
import Container from "./primitives/Container";

/** Base registry (components bundled with the app) */
const registry = {
  Button,
  Card,
  View,
  Text,
  Input,
  Image,
  Spacer,
  Container
};

// ... keep the rest of your export functions (registerComponent, etc.) the same
