// frontend/src/builder/components/registry.jsx
import React from "react";
import { Button, Input, Text, Image, View, Container, Spacer } from "../../components/primitives";

export const RegistryV2 = {
  text: (props) => <Text {...props} />,
  heading: ({ value, level = 2, className = "" }) => (
    <Text as={`h${level}`} className={`font-bold tracking-tighter ${className}`}>
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

  // PREMIUM UI PATTERNS (Fixed the "Bubble" look)
  card: ({ children, className = "" }) => (
    <div className={`p-6 rounded-2xl bg-[#0F0F14] border border-white/5 shadow-2xl ${className}`}>
      {children}
    </div>
  ),
  divider: ({ className = "" }) => (
    <hr className={`border-none border-t border-white/5 my-6 ${className}`} />
  )
};
