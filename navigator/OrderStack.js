import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../screens/Order";

const Stack = createNativeStackNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="Order">
      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
};

export default OrderStack;
