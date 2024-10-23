import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../screens/OrderScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

const OrderStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Order"
      screenOptions={{
        headerStyle: { backgroundColor: "#272d2b" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Order"
        component={OrderScreen}
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
    </Stack.Navigator>
  );
};

export default OrderStack;
