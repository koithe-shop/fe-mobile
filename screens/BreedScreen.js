import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const koiBreeds = [
  {
    name: "Kohaku",
    image:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
    rating: 4.5,
  },
  {
    name: "Sanke",
    image:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__66__a862d072cefe43afacd7702dd35a4c36_grande.png",
    rating: 4.2,
  },
  {
    name: "Showa",
    image:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__67__2ec4d4b8616347d7b2cf1302d79e421c_grande.png",
    rating: 1.2,
  },
  {
    name: "Shusui",
    image:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__72__87698067ae324bae84572162553d8183_grande.png",
    rating: 4.8,
  },
  {
    name: "Utsuri",
    image:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__74__751852fb25374c3eb9284c8fdb9cc663_grande.png",
    rating: 4.3,
  },
  {
    name: "Tancho",
    image:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__73__375905fbe0534601b5a50f83f87af0e6_grande.png",
    rating: 4,
  },
];

const BreedScreen = () => {
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
        <Text style={styles.breedName}>{item.name}</Text>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={koiBreeds}
        renderItem={renderBreedItem}
        keyExtractor={(item) => item.name}
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
