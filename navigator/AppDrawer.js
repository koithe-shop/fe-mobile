import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import OrderStack from "./OrderStack";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  // Prevent drawer from scrolling
  <DrawerContentScrollView
    {...props}
    contentContainerStyle={styles.drawerContent}
    scrollEnabled={false}
  >
    <View>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/koi-the-b4e6c.appspot.com/o/fb9b0f4e1b5a62b6c3909cbe2cc5139b.jpg?alt=media&token=1a145576-876d-455d-8424-b57226c62f79",
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Hello, User</Text>
      </View>

      <View style={styles.body}>
        <DrawerItemList {...props} />
      </View>
    </View>

    {/* Logout Button */}
    <View style={styles.logoutContainer}>
      <View style={styles.divider} />
      <Pressable
        onPress={() => console.log("Logout pressed")}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  </DrawerContentScrollView>
);

const AppDrawer = () => {
  return (
    <>
      {/* <StatusBar animated={false} /> */}
      <Drawer.Navigator
        initialRouteName="HomeStack"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerPosition="right"
        screenOptions={{
          headerShown: false,
          swipeEnabled: true,
          drawerActiveBackgroundColor: "#4c5551", // Background color for active item
          drawerActiveTintColor: "#fff", // Text color for active item
          drawerInactiveTintColor: "#000", // Text color for inactive item
          drawerInactiveBackgroundColor: "#fff", // Background color for inactive item
          drawerLabelStyle: {
            fontSize: 16, // Customize font size
            fontWeight: "600",
          },
          drawerItemStyle: {
            marginVertical: 0, // Remove top and bottom margins
            marginHorizontal: 0, // Remove left and right margins
            paddingHorizontal: 10, // Optional: add padding if needed
            paddingVertical: 4,
            borderRadius: 0,
          },
        }}
      >
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ title: "Home" }}
        />
        <Drawer.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{ title: "Profile" }}
        />
        <Drawer.Screen
          name="OrderStack"
          component={OrderStack}
          options={{ title: "Order" }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default AppDrawer;

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  header: {
    backgroundColor: "#2a2f2d",
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  body: {},
  divider: {
    height: 1,
    backgroundColor: "#d3d3d390",
  },
  logoutContainer: {
    padding: 20, // Padding around the logout button
  },
  logoutButton: {
    // backgroundColor: "#ff5c5c", // Background color for the button
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderRadius: 5,
    // alignItems: "center", // Center the text
  },
  logoutText: {
    color: "#ff5c5c", // Text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
