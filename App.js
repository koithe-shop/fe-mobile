import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { AsyncStorageProvider } from "./context/AsyncStorageContext"; // Cập nhật đường dẫn đúng
import AppStack from "./navigator/AppStack";

export default function App() {
  return (
    <>
      <StatusBar animated={true} />
      <AsyncStorageProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </AsyncStorageProvider>
    </>
  );
}
