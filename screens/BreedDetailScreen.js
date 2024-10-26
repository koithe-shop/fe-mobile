import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Product from "../components/Product";
import RatingList from "../components/RatingList";

const products = [
  {
    id: "1",
    name: "Koi Fish A",
    price: 25,
    imageUrl:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
    dateAdded: "2024-10-20",
    breed: "Sanke",
  },
  {
    id: "2",
    name: "Koi Fish B",
    price: 30,
    imageUrl:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__66__a862d072cefe43afacd7702dd35a4c36_grande.png",
    dateAdded: "2024-10-19",
    breed: "Kohaku",
  },
  // ... other products
];

const ratings = [
  {
    id: "1",
    comment: "Beautiful fish, very healthy!",
    star: 5,
  },
  {
    id: "2",
    comment: "Great color and size.",
    star: 4,
  },
  // ... other ratings
];

// Scenes for each tab
const ProductRoute = () => (
  <FlatList
    data={products}
    keyExtractor={(item) => item.id}
    numColumns={2} // To render products in two columns
    renderItem={({ item }) => <Product item={item} />} // Call the Product component
  />
);

const RatingRoute = () => <RatingList item={ratings} />;

export default function BreedDetail() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "products", title: "Products" },
    { key: "ratings", title: "Ratings" },
  ]);

  const renderScene = SceneMap({
    products: ProductRoute,
    ratings: RatingRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#ffca28" }}
      style={{ backgroundColor: "#ffffff" }}
      labelStyle={{ color: "#000" }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.headerImage}
          source={{
            uri: "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__73__375905fbe0534601b5a50f83f87af0e6_grande.png",
          }}
        />
        <Text style={styles.breedName}>Kohaku</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  breedName: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    color: "#fff",
    fontSize: 26,
    padding: 10,
    fontWeight: "bold",
  },
  ratingCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
