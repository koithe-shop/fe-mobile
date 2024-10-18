import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppDrawer from "./navigator/AppDrawer";
import { AsyncStorageProvider } from "./context/AsyncStorageContext"; // Cập nhật đường dẫn đúng

export default function App() {
  return (
    <>
      <StatusBar animated={true} />
      <AsyncStorageProvider>
        <NavigationContainer>
          <AppDrawer />
        </NavigationContainer>
      </AsyncStorageProvider>
    </>
  );
}
