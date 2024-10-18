// SearchBar.js
import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const SearchBar = ({ onCartPress, onSearchPress }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search for Koi breeds, blogs, news..."
        style={styles.searchInput}
        clearButtonMode="always"
        onTouchStart={onSearchPress} // Mở modal khi chạm vào ô tìm kiếm
      />
      <TouchableOpacity onPress={onCartPress} style={styles.cartButton}>
        <Icon name="shopping-cart" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
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

export default SearchBar;
