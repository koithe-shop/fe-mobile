import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/Home";
import ProductScreen from "../screens/Product/Product";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#272d2b" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerLeft: () => (
              <Button
                title="Menu"
                onPress={() => navigation.openDrawer()} // Mở Drawer chỉ khi ở màn hình Home
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{
            title: "Product Details",
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
