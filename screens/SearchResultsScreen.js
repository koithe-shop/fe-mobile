// SearchResultsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchResultsScreen = ({ route }) => {
  const { searchTerm } = route.params; // Retrieve the search term from params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for "{searchTerm}"</Text>
      {/* Display search results based on searchTerm */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SearchResultsScreen;
