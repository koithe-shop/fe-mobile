import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection";
import KoiBreeds from "../components/KoiBreeds";
import ProductSection from "../components/ProductSection";
import { getAllCategory } from "../api/categoryApi";
import { getAllProduct } from "../api/productApi";

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        const availableProducts = data.filter(product => product.status === "Available" || product.status === "Consigned Sale");
        setProducts(availableProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
     };
     
     checkTokenExpiration();
     fetchCategories();
     fetchProducts();
  }, []);

  const sections = [
    { key: "hero", component: <HeroSection /> },
    {
      key: "koiBreeds",
      component: <KoiBreeds categories={categories} navigation={navigation} />,
    },
    {
      key: "productSection",
      component: <ProductSection products={products} navigation={navigation} />,
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedSearchBar}>
        <SearchBar />
      </View>
      <FlatList
        data={sections}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  fixedSearchBar: {
    backgroundColor: "#fff",
    zIndex: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default HomeScreen;
