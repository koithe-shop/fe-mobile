import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const KoiBreeds = ({ navigation }) => {
  const koiBreeds = [
    {
      name: "Kohaku",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
    },
    {
      name: "Sanke",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__66__a862d072cefe43afacd7702dd35a4c36_grande.png",
    },
    {
      name: "Showa",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__67__2ec4d4b8616347d7b2cf1302d79e421c_grande.png",
    },
    {
      name: "Shusui",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__72__87698067ae324bae84572162553d8183_grande.png",
    },
    {
      name: "Utsuri",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__74__751852fb25374c3eb9284c8fdb9cc663_grande.png",
    },
    {
      name: "Tancho",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__73__375905fbe0534601b5a50f83f87af0e6_grande.png",
    },
  ];

  return (
    <View style={styles.section}>
      <View style={styles.flexJusSpace}>
        <Text style={styles.sectionTitle}>Giống Cá Koi Phổ Biến</Text>

        <Pressable
          onPress={() => navigation.navigate("Breed")}
          style={styles.viewMoreContainer}
        >
          <Text style={styles.viewMore}>Xem tất cả</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#ba2d32"
          />
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {koiBreeds.map((breed, index) => (
          <Pressable
            key={index}
            style={styles.breedCard}
            onPress={() => navigation.navigate("BreedDetail", { breed })}
          >
            <Image source={{ uri: breed.image }} style={styles.breedImage} />
            <Text style={styles.breedName}>{breed.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: 20 },
  flexJusSpace: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ba2d32", // Consistent color with your theme
  },
  viewMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewMore: {
    fontSize: 14,
    color: "#ba2d32", // Match the theme color
    marginRight: 5, // Space between text and icon
  },
  breedCard: {
    width: 120,
    marginRight: 10,
    backgroundColor: "#ffffffcc", // Light background for contrast
    borderRadius: 10,
    alignItems: "center",
    padding: 5,
    elevation: 3, // Add a shadow effect for depth
  },
  breedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover", // Use cover to fill the circle
  },
  breedName: {
    textAlign: "center",
    marginTop: 5,
    fontWeight: "600",
  },
});

export default KoiBreeds;
