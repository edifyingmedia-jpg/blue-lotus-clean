// frontend/src/builder/components/registry.jsx
import React from "react";
// Import your modernized primitives
import { 
  Button, Input, Text, Image, 
  View, Container, Spacer 
} from "../../components/primitives";

/**
 * Component Registry v2
 * ---------------------
 * Now utilizing the centralized, Tailwind-powered primitives.
 */
export const RegistryV2 = {
  text: (props) => <Text {...props} />,
  heading: ({ value, level = 2, className = "" }) => (
    <Text as={`h${level}`} className={`font-bold ${className}`}>
      {value}
    </Text>
  ),
  button: (props) => <Button {...props} />,
  input: (props) => <Input {...props} />,
  image: (props) => <Image {...props} />,
  container: (props) => <Container {...props} />,
  spacer: (props) => <Spacer {...props} />,
  
  // Layout components
  row: (props) => <View direction="row" {...props} />,
  column: (props) => <View direction="col" {...props} />,
  
  // Specific UI patterns
  card: ({ children, className = "" }) => (
    <div className={`p-4 rounded-lg bg-white shadow-md border border-gray-200 ${className}`}>
      {children}
    </div>
  ),
  divider: ({ className = "" }) => (
    <hr className={`border-none border-t border-gray-200 my-4 ${className}`} />
  )
};
