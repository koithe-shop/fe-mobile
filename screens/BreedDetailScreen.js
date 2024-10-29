import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Product from "../components/Product";
import RatingList from "../components/RatingList";
import { getProductsByCategoryId } from "../api/productApi";

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
const ProductRoute = ({ products, loading, error }) => {
  if (loading) {
    return <ActivityIndicator size="large" color="#ffca28" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (products.length === 0) {
    return <Text style={styles.noProductText}>Không có sản phẩm</Text>;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2} // Renders products in two columns
      renderItem={({ item }) => <Product item={item} />} // Calls the Product component
    />
  );
};

const RatingRoute = () => <RatingList item={ratings} />;

export default function BreedDetail({ route }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { categoryId } = route.params; // Lấy id từ params
  console.log(categoryId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategoryId(categoryId);
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts(); // Call the function only if categoryId is available
    }
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "products", title: "Products" },
    { key: "ratings", title: "Ratings" },
  ]);

  const renderScene = SceneMap({
    products: () => (
      <ProductRoute products={products} loading={loading} error={error} />
    ),
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noProductText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
});
