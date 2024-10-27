// // AppStack.js
// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../screens/LoginScreen"; // Đảm bảo đường dẫn đúng
// import AppDrawer from "../navigator/AppDrawer"; // Đảm bảo đường dẫn đúng
// import { StatusBar } from "react-native";
// import RegisterScreen from "../screens/RegisterScreen";

// const Stack = createNativeStackNavigator();

// const AppStack = () => {
//   return (
//     <>
//       <StatusBar animated={true} />
//       <Stack.Navigator
//         initialRouteName="Login"
//         // initialRouteName="AppDrawer"
//         screenOptions={{ gestureEnabled: false }} // Tắt vuốt trái phải
//       >
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }} // Tắt header cho LoginScreen
//         />
//         <Stack.Screen
//           name="Register"
//           component={RegisterScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="AppDrawer"
//           component={AppDrawer}
//           options={{ headerShown: false }} // Tắt header cho AppDrawer
//         />
//       </Stack.Navigator>
//     </>
//   );
// };

// export default AppStack;

// AppStack.js
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar, ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../screens/LoginScreen";
import AppDrawer from "../navigator/AppDrawer";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setInitialRoute(token ? "AppDrawer" : "Login");
      } catch (error) {
        console.error("Failed to retrieve token:", error);
        setInitialRoute("Login");
      }
    };

    checkToken();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <>
      <StatusBar animated={true} />
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppDrawer"
          component={AppDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;
