import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import SearchScreen from "../screens/SearchScreen";

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
            title: "Product",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen} // Add Search screen to the stack
          options={{
            title: "Search",
            headerLeft: () => null,

            headerShown: false, // Hide the header for ProductScreen
          }}
        />
        <Stack.Screen
          name="SearchResults"
          component={SearchResultsScreen}
          options={{
            // Ẩn nút menu drawer
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
