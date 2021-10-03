import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackCustom from "./src/routes/stack";

import { AuthProvider } from "./src/contexts/auth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackCustom />
      </AuthProvider>
    </NavigationContainer>
  );
}
