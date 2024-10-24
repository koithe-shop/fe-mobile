import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Rating data
const ratings = [
  {
    id: "1",
    userId: "101",
    categoryId: "201",
    userName: "John Doe",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "Beautiful fish, very healthy!",
    rating: 5,
    date: "2024-10-20",
  },
  {
    id: "2",
    userId: "102",
    categoryId: "202",
    userName: "Jane Smith",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Great color and size.",
    rating: 4,
    date: "2024-10-19",
  },
  // ... other ratings
];

// Rating item component
const RatingItem = ({ item }) => (
  <View style={styles.ratingCard}>
    <View style={styles.userInfo}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View style={styles.userDetails}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
    <View style={styles.starRow}>
      {[...Array(item.rating)].map((_, index) => (
        <FontAwesome key={index} name="star" size={16} color="#FFD700" />
      ))}
    </View>
    <Text style={styles.comment}>{item.description}</Text>
  </View>
);

// RatingList component
const RatingList = () => (
  <FlatList
    data={ratings}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <RatingItem item={item} />}
  />
);

const styles = StyleSheet.create({
  ratingCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flexDirection: "column",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});

export default RatingList;
