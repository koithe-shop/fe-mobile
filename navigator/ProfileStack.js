import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import UpdateUserScreen from "../screens/UpdateUserScreen";
import CreateBankAccountScreen from "../screens/CreateBankAccountScreen";

const Stack = createNativeStackNavigator();

const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: { backgroundColor: "#272d2b" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ padding: 10 }}
            >
              <Icon name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CreateBankAccountScreen"
        component={CreateBankAccountScreen}
        options={{
          title: "Add bank",
        }}
      />
      <Stack.Screen
        name="UpdateUserScreen"
        component={UpdateUserScreen}
        options={{
          title: "Update User",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
