import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";

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
      <Text style={styles.sectionTitle}>Popular Koi Fish Breeds</Text>
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
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  breedCard: { width: 120, marginRight: 10 },
  breedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: "contain",
  },
  breedName: { textAlign: "center", marginTop: 5 },
});

export default KoiBreeds;
