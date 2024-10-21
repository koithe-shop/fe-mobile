import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import SearchBarFilter from "../components/SearchBarFilter";
import Product from "../components/Product"; // Import the new Product component

const ProductScreen = ({ route, navigation }) => {
  const { searchTerm } = route.params; // Retrieve the search term from params
  const [searchText, setSearchText] = useState(searchTerm || ""); // Manage search text state

  const products = [
    {
      id: "1",
      name: "Koi Fish A",
      price: 25,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
      dateAdded: "2024-10-20",
      breed: "Sanke", // New breed field
    },
    {
      id: "2",
      name: "Koi Fish B",
      price: 30,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__66__a862d072cefe43afacd7702dd35a4c36_grande.png",
      dateAdded: "2024-10-19",
      breed: "Kohaku", // New breed field
    },
    {
      id: "3",
      name: "Koi Fish C",
      price: 20,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__67__2ec4d4b8616347d7b2cf1302d79e421c_grande.png",
      dateAdded: "2024-10-18",
      breed: "Showa", // New breed field
    },
    {
      id: "4",
      name: "Koi Fish D",
      price: 35,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__72__87698067ae324bae84572162553d8183_grande.png",
      dateAdded: "2024-10-21",
      breed: "Utsuri", // New breed field
    },
    // Additional Koi Fish
    {
      id: "5",
      name: "Koi Fish Eoi Fish Eoi Fish E",
      price: 28,
      imageUrl: "https://example.com/koi_fish_e.jpg", // Replace with actual image URL
      dateAdded: "2024-10-17",
      breed: "Taisho Sanshoku", // New breed field
    },
    {
      id: "6",
      name: "Koi Fish F",
      price: 40,
      imageUrl: "https://example.com/koi_fish_f.jpg", // Replace with actual image URL
      dateAdded: "2024-10-15",
      breed: "Shiro Utsuri", // New breed field
    },
    {
      id: "7",
      name: "Koi Fish G",
      price: 50,
      imageUrl: "https://example.com/koi_fish_g.jpg", // Replace with actual image URL
      dateAdded: "2024-10-16",
      breed: "Goshiki", // New breed field
    },
    {
      id: "8",
      name: "Koi Fish H",
      price: 45,
      imageUrl: "https://example.com/koi_fish_h.jpg", // Replace with actual image URL
      dateAdded: "2024-10-14",
      breed: "Asagi", // New breed field
    },
  ];

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  // Sort products by date added in descending order
  const sortedProducts = [...products]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

  return (
    <View style={styles.container}>
      <SearchBarFilter />
      <FlatList
        data={sortedProducts}
        renderItem={({ item }) => <Product item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2} // Set number of columns to 2
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: 100,
    justifyContent: "space-between", // Ensure space between items
  },
});

export default ProductScreen;
