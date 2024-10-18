import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./navigator/HomeStack";
import ProfileStack from "./navigator/ProfileStack";
import OrderStack from "./navigator/OrderStack";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Button, StatusBar } from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <StatusBar animated={true} />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeStack"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerPosition="right"
          drawerStyle={{
            backgroundColor: "#c6cbef",
            width: 240,
          }}
          screenOptions={{
            headerShown: false, // Ẩn header trong Drawer
            swipeEnabled: true, // Bật vuốt mặc định cho các màn hình khác
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
        <StatusBar style="auto" />
      </NavigationContainer>
    </>
  );
}

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Hello, User</Text>
    </View>
    <DrawerItemList {...props} />
    <Button title="Logout" onPress={() => console.log("Logout pressed")} />
  </DrawerContentScrollView>
);
