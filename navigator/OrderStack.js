import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderScreen from "../screens/OrderScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import OrderDetailScreen from "../screens/OrderDetailScreen";

const Stack = createNativeStackNavigator();

const OrderStack = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Order" }],
      });
    });

    return unsubscribe;
  }, [navigation]);
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
          title: "Orders",
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

      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default OrderStack;
