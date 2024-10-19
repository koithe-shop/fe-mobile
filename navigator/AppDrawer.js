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
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  Alert, // Nhập Alert
} from "react-native";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy đăng xuất"),
          style: "cancel",
        },
        {
          text: "Đăng xuất",
          onPress: () => {
            console.log("Logout pressed");
            props.navigation.navigate("Login"); // Điều hướng về trang Login
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
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
      <View style={styles.logoutContainer}>
        <View style={styles.divider} />
        <Pressable
          onPress={handleLogout} // Gọi hàm handleLogout
          style={styles.logoutButton}
          accessibilityLabel="Logout"
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const AppDrawer = () => {
  return (
    <>
      <StatusBar animated={true} />
      <Drawer.Navigator
        initialRouteName="HomeStack"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerPosition="right"
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          drawerActiveBackgroundColor: "#4c5551",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#000",
          drawerInactiveBackgroundColor: "#fff",
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
          drawerItemStyle: {
            marginVertical: 0,
            marginHorizontal: 0,
            paddingHorizontal: 10,
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
    padding: 20,
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutText: {
    color: "#ff5c5c",
    fontSize: 16,
    fontWeight: "bold",
  },
});
