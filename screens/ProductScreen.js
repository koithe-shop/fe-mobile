import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import SearchBarFilter from "../components/SearchBarFilter";
import Product from "../components/Product";

const ProductScreen = ({ route, navigation }) => {
  const { searchTerm } = route.params;
  const [searchText, setSearchText] = useState(searchTerm || "");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

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
    {
      id: "3",
      name: "Koi Fish C",
      price: 20,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__67__2ec4d4b8616347d7b2cf1302d79e421c_grande.png",
      dateAdded: "2024-10-18",
      breed: "Showa",
    },
    {
      id: "4",
      name: "Koi Fish D",
      price: 35,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__72__87698067ae324bae84572162553d8183_grande.png",
      dateAdded: "2024-10-21",
      breed: "Utsuri",
    },
    {
      id: "5",
      name: "Koi Fish E",
      price: 28,
      imageUrl: "https://example.com/koi_fish_e.jpg",
      dateAdded: "2024-10-17",
      breed: "Taisho Sanshoku",
    },
    {
      id: "6",
      name: "Koi Fish F",
      price: 40,
      imageUrl: "https://example.com/koi_fish_f.jpg",
      dateAdded: "2024-10-15",
      breed: "Shiro Utsuri",
    },
    {
      id: "7",
      name: "Koi Fish G",
      price: 50,
      imageUrl: "https://example.com/koi_fish_g.jpg",
      dateAdded: "2024-10-16",
      breed: "Goshiki",
    },
    {
      id: "8",
      name: "Koi Fish H",
      price: 45,
      imageUrl: "https://example.com/koi_fish_h.jpg",
      dateAdded: "2024-10-14",
      breed: "Asagi",
    },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const sortedProducts = [...products]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.breed.toLowerCase().includes(searchText.toLowerCase())
    );

  useEffect(() => {
    setLoading(true); // Set loading to true
    const timer = setTimeout(() => {
      setFilteredProducts(sortedProducts);
      setLoading(false); // Set loading to false after delay
    }, 1000); // 1 second delay for loading effect

    return () => clearTimeout(timer); // Clear timeout on component unmount
  }, [searchText]); // Update filtered products when searchText changes

  const handleApplyFilters = ({ selectedBreeds, selectedPrice }) => {
    setLoading(true); // Set loading to true
    const timer = setTimeout(() => {
      let filtered = [...products];

      // Filter by selected breeds
      if (selectedBreeds.length > 0) {
        filtered = filtered.filter((product) =>
          selectedBreeds.includes(product.breed)
        );
      }

      // Filter by price order
      if (selectedPrice) {
        filtered = filtered.sort((a, b) => {
          return selectedPrice === "asc"
            ? a.price - b.price
            : b.price - a.price;
        });
      }

      setFilteredProducts(filtered);
      setLoading(false); // Set loading to false after delay
    }, 1000); // 1 second delay for loading effect

    return () => clearTimeout(timer); // Clear timeout on component unmount
  };

  const handleEndReached = () => {
    if (!showEndMessage) {
      setShowEndMessage(true); // Show the end message
      setTimeout(() => {
        setShowEndMessage(false); // Hide the end message after 5 seconds
      }, 5000);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBarFilter
        onApplyFilters={handleApplyFilters}
        searchText={searchText}
        setSearchText={setSearchText} // Pass the setter function to update search text
      />
      {loading ? ( // Show loading indicator if loading is true
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
          data={filteredProducts}
          renderItem={({ item }) => <Product item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      )}
      {showEndMessage && (
        <Text style={styles.endMessage}>---Đã đến cuối danh sách---</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  productList: {
    paddingBottom: 50,
    marginTop: 20,
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
    marginBottom: 20,
    fontSize: 16,
    color: "#999",
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default ProductScreen;
