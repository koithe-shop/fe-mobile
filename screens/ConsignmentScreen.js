import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import ConsignmentSaleHistory from "../components/ConsignmentSaleHistory";
import ConsignmentCareHistory from "../components/ConsignmentCareHistory";

const Tab = createMaterialTopTabNavigator();

function ConsignmentSaleTab() {
  const navigation = useNavigation();

  const navigateToConsignmentSaleScreen = () => {
    navigation.navigate("ConsignmentSaleScreen");
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={navigateToConsignmentSaleScreen}
      >
        <Text style={styles.buttonText}>Tạo Ký Gửi Bán</Text>
      </TouchableOpacity>
      <ConsignmentSaleHistory />
    </View>
  );
}

function ConsignmentCareTab() {
  const navigation = useNavigation();

  const navigateToConsignmentCareScreen = () => {
    navigation.navigate("ConsignmentCareScreen");
  };

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={navigateToConsignmentCareScreen}
      >
        <Text style={styles.buttonText}>Tạo Ký Gửi Chăm Sóc</Text>
      </TouchableOpacity>
      <ConsignmentCareHistory />
    </View>
  );
}

// ... (rest of the code remains unchanged)

export default function ConsignmentScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
        tabBarStyle: { backgroundColor: "#333" },
        tabBarActiveTintColor: "#FFF",
        tabBarIndicatorStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Tab.Screen
        name="ConsignmentSaleTab"
        component={ConsignmentSaleTab}
        options={{ tabBarLabel: "Ký gửi bán" }}
      />
      <Tab.Screen
        name="ConsignmentCareTab"
        component={ConsignmentCareTab}
        options={{ tabBarLabel: "Ký gửi chăm sóc" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    padding: 16,
  },
  createButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
