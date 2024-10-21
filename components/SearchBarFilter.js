// SearchBar.js
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import Filter from "./Filter";

const SearchBarFilter = () => {
  const navigation = useNavigation(); // Get navigation object using the hook

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  const handleSearchPress = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search for Koi "
        style={styles.searchInput}
        clearButtonMode="always"
        onTouchStart={handleSearchPress} // Mở modal khi chạm vào ô tìm kiếm
        editable={false} // Disable typing so it acts like a button
      />
      <Filter />
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 5,
    gap: 20,
    height: 40,
  },
  searchInput: {
    borderRadius: 8,
    flex: 1,
    fontSize: 16,
    backgroundColor: "#edeef0",
    padding: 8,
  },
  cartButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
});

export default SearchBarFilter;
