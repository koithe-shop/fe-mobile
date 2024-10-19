// AppStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen"; // Đảm bảo đường dẫn đúng
import AppDrawer from "../navigator/AppDrawer"; // Đảm bảo đường dẫn đúng
import { StatusBar } from "react-native";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <>
      <StatusBar animated={true} />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ gestureEnabled: false }} // Tắt vuốt trái phải
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Tắt header cho LoginScreen
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppDrawer"
          component={AppDrawer}
          options={{ headerShown: false }} // Tắt header cho AppDrawer
        />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
