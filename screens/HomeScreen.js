import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import HeroSection from "../components/HeroSection";
import KoiBreeds from "../components/KoiBreeds";
import Blogs from "../components/Blogs";
import News from "../components/News";
import FAQs from "../components/FAQs";

const HomeScreen = ({ navigation }) => {
  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  const handleSearchPress = () => {
    navigation.navigate("Search"); // Navigate to Search screen
  };

  return (
    <View>
      <View style={styles.fixedSearchBar}>
        <SearchBar
          onCartPress={handleCartPress}
          onSearchPress={handleSearchPress}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeroSection />
        <View style={styles.container}>
          <KoiBreeds navigation={navigation} />
          <Blogs navigation={navigation} />
          <News navigation={navigation} />
          <FAQs />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingBottom: 100 },
  fixedSearchBar: {
    backgroundColor: "#fff",
    zIndex: 10,
    paddingHorizontal: 10,
  },
  scrollViewContent: {},
});

export default HomeScreen;
