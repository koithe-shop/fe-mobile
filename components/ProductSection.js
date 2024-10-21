import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const KoiFish = ({ navigation }) => {
  // const [wishlist, setWishlist] = useState([]);

  const koiFish = [
    {
      id: "1",
      name: "Kohaku KohakuKohakuKohaku",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
      price: "5,000,000 VND",
    },
    {
      id: "2",
      name: "Sanke",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__66__a862d072cefe43afacd7702dd35a4c36_grande.png",
      price: "7,000,000 VND",
    },
    {
      id: "3",
      name: "Showa",
      image:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__67__2ec4d4b8616347d7b2cf1302d79e421c_grande.png",
      price: "6,500,000 VND",
    },
  ];

  // const toggleWishlist = (id) => {
  //   setWishlist((prev) =>
  //     prev.includes(id) ? prev.filter((fishId) => fishId !== id) : [...prev, id]
  //   );
  // };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.fishCard}
      onPress={() => navigation.navigate("FishDetail", { fish: item })}
    >
      {/* <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => toggleWishlist(item.id)}
      >
        <AntDesign
          name="heart"
          size={20}
          color={wishlist.includes(item.id) ? "red" : "black"}
        />
      </TouchableOpacity> */}
      <Image source={{ uri: item.image }} style={styles.fishImage} />
      <Text style={styles.fishName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
      <Text style={styles.fishPrice}>{item.price}</Text>
    </Pressable>
  );

  return (
    <View style={styles.section}>
      <View style={styles.flexJusSpace}>
        <Text style={styles.sectionTitle}>Cá Koi</Text>
        <Pressable
          onPress={() => navigation.navigate("Product", { searchTerm: "" })}
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

      <FlatList
        data={koiFish}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: 20, paddingHorizontal: 10 },
  flexJusSpace: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ba2d32",
  },
  viewMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewMore: {
    fontSize: 14,
    color: "#ba2d32",
    marginRight: 5,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  fishCard: {
    width: "48%",
    backgroundColor: "#fcfcff",
    borderRadius: 20,
    alignItems: "center",
    elevation: 5, // For Android shadow
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.5, // Shadow blur radius
  },
  fishImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    objectFit: "cover",
    marginBottom: 5,
  },
  fishName: {
    textAlign: "left",
    width: "100%",
    marginTop: 5,
    fontWeight: "600",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  fishPrice: {
    marginTop: 5,
    fontSize: 14,
    width: "100%",
    textAlign: "right",
    color: "#ba2d32",
    paddingHorizontal: 10,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
  },
});

export default KoiFish;
