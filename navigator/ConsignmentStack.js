import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";
import ConsignmentScreen from "../screens/ConsignmentScreen";
import CreateConsignmentScreen from "../screens/ConsignmentCareScreen";
import ConsignmentCareScreen from "../screens/ConsignmentCareScreen";
import ConsignmentSaleScreen from "../screens/ConsignmentSaleScreen";
import ConsignmentCareDetailScreen from "../screens/ConsignmentCareDetailScreen";
import PaymentPage from "../screens/PaymentCarePage";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import WithdrawScreen from "../screens/WithdrawScreen";

const Stack = createNativeStackNavigator();

const ConsignmentStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="Consignment"
      screenOptions={{
        headerStyle: { backgroundColor: "#272d2b" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Consignment"
        component={ConsignmentScreen}
        options={{
          title: "Ký gửi",
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
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          // headerShown: false,
          title: "Detail",
        }}
      />
      <Stack.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{
          // headerShown: false,
          title: "Withdraw",
        }}
      />
      <Stack.Screen
        name="ConsignmentCareScreen"
        component={ConsignmentCareScreen}
        options={{
          title: "Gửi chăm sóc",
          headerShown: false,
        }}
      />
      <Stack.Screen name="PaymentPage" component={PaymentPage} />
      <Stack.Screen
        name="ConsignmentCareDetail"
        component={ConsignmentCareDetailScreen}
        options={({ navigation }) => ({
          title: "Thông tin chăm sóc",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Consignment")} // Navigate back to the home screen
              style={{ padding: 10 }}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ConsignmentSaleScreen"
        component={ConsignmentSaleScreen}
        options={{
          headerShown: false,
          title: "Gửi bán",
        }}
      />
    </Stack.Navigator>
  );
};

export default ConsignmentStack;
