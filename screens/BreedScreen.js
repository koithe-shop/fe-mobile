import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { getAllCategory } from "../api/categoryApi";

const BreedScreen = () => {
  const [categories, setCategories] = useState([]);
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

    fetchCategories();
  }, []);

  const navigation = useNavigation();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.1;
    return [...Array(5)].map((_, index) => {
      if (index < fullStars) {
        return (
          <MaterialIcons key={index} name="star" size={24} color="#ffca28" />
        );
      } else if (index === fullStars && hasHalfStar) {
        return (
          <MaterialIcons
            key={index}
            name="star-half"
            size={24}
            color="#ffca28"
          />
        );
      } else {
        return (
          <MaterialIcons
            key={index}
            name="star-border"
            size={24}
            color="#ffca28"
          />
        );
      }
    });
  };
  const handlePress = () => {
    navigation.navigate("BreedDetail");
  };

  const renderBreedItem = ({ item }) => (
    <Pressable onPress={handlePress} style={styles.breedCard}>
      <Image source={{ uri: item.image }} style={styles.breedImage} />
      <View style={styles.flexBetween}>
        <Text style={styles.breedName}>{item.categoryName}</Text>
        {/* <View style={styles.ratingContainer}>{renderStars(item.rating)}</View> */}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderBreedItem}
        keyExtractor={(item) => item?._id}
        numColumns={1}
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  breedCard: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    elevation: 2,
    alignItems: "center",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  breedImage: {
    width: "100%",
    height: 130, // Adjust height as needed
    borderRadius: 10,
    objectFit: "cover",
  },
  breedName: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 5,
  },
  flexBetween: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default BreedScreen;
