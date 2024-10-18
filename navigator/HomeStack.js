import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import ProductScreen from "../screens/Product";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchResultsScreen from "../screens/SearchResultsScreen";

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
          options={({ navigation }) => ({
            title: "Koi Thé",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{ padding: 10 }}
              >
                <Icon name="menu" size={24} color="#fff" />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: "#272d2b",
            },
            headerTintColor: "#fff",
          })}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{
            title: "Product Details",
          }}
        />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
