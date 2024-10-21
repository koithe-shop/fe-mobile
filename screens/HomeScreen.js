import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection";
import KoiBreeds from "../components/KoiBreeds";
import ProductSection from "../components/ProductSection";

const HomeScreen = ({ navigation }) => {
  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  const handleSearchPress = () => {
    navigation.navigate("Search");
  };

  const sections = [
    { key: "hero", component: <HeroSection /> },
    { key: "koiBreeds", component: <KoiBreeds navigation={navigation} /> },
    {
      key: "productSection",
      component: <ProductSection navigation={navigation} />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.fixedSearchBar}>
        <SearchBar />
      </View>
      <FlatList
        data={sections}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
});

export default HomeScreen;
