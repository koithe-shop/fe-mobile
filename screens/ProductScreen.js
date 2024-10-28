import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import SearchBarFilter from "../components/SearchBarFilter";
import Product from "../components/Product";
import { getAllProduct } from "../api/productApi";
import { getAllCategory } from "../api/categoryApi";

const ProductScreen = ({ route, navigation }) => {
  const { searchTerm } = route.params;
  const [searchText, setSearchText] = useState(searchTerm || "");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false); // State to track loading more products
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [displayCount, setDisplayCount] = useState(6); // Initialize display count
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
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
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    const sortedProducts = products.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchText.toLowerCase()) ||
        (product.categoryId?.categoryName || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );

    setFilteredProducts(sortedProducts); // Update filtered products immediately
  }, [searchText, products]);

  // const handleApplyFilters = ({ selectedBreeds, selectedPrice }) => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     let filtered = [...products];

  //     if (selectedBreeds.length > 0) {
  //       filtered = filtered.filter((product) =>
  //         selectedBreeds.includes(product.categoryId.categoryName)
  //       );
  //     }

  //     if (selectedPrice) {
  //       filtered = filtered.sort((a, b) => {
  //         return selectedPrice === "asc"
  //           ? a.price - b.price
  //           : b.price - a.price;
  //       });
  //     }

  //     setFilteredProducts(filtered);
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // };

  const handleApplyFilters = ({ selectedBreeds, selectedPrice }) => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...products];

      if (selectedBreeds.length > 0) {
        filtered = filtered.filter(
          (product) =>
            product.categoryId &&
            selectedBreeds.includes(product.categoryId.categoryName)
        );
      }

      if (selectedPrice) {
        filtered = filtered.sort((a, b) =>
          selectedPrice === "asc" ? a.price - b.price : b.price - a.price
        );
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  const handleEndReached = () => {
    if (!loadingMore && displayCount < filteredProducts.length) {
      setLoadingMore(true); // Start loading more products
      setTimeout(() => {
        setDisplayCount((prevCount) =>
          Math.min(prevCount + 6, filteredProducts.length)
        ); // Load 6 more products
        setLoadingMore(false); // Stop loading more products
      }, 1000); // Simulate loading time
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBarFilter
        categories={categories}
        onApplyFilters={handleApplyFilters}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loadingIndicator}
        />
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không tìm thấy sản phẩm nào</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts.slice(0, displayCount)} // Only show the first 'displayCount' products
          renderItem={({ item }) => <Product item={item} />}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator
                size="small"
                color="#0000ff"
                style={styles.footerLoading}
              />
            ) : (
              displayCount >= filteredProducts.length && (
                <Text style={styles.endMessage}>
                  ---Đã đến cuối danh sách---
                </Text>
              )
            )
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  productList: {
    paddingBottom: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
  },
  endMessage: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#999",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  footerLoading: {
    marginVertical: 10,
  },
});
export default ProductScreen;
