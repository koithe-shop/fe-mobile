import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: "#4a90e2" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerLeft: () => (
            <Button
              title="Menu"
              onPress={() => navigation.openDrawer()} // Hiển thị nút mở Drawer
              color="#fff"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
