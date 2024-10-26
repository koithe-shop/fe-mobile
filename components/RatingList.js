// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   Modal,
//   TouchableOpacity,
//   Button,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// // Rating data
// const ratings = [
//   {
//     id: "1",
//     userId: "101",
//     categoryId: "201",
//     userName: "John Doe",
//     avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
//     description: "Beautiful fish, very healthy!",
//     rating: 5,
//     date: "2024-10-20",
//   },
//   {
//     id: "2",
//     userId: "102",
//     categoryId: "202",
//     userName: "Jane Smith",
//     avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
//     description: "Great color and size.",
//     rating: 4,
//     date: "2024-10-19",
//   },
//   // ... other ratings
// ];

// // Rating item component
// const RatingItem = ({ item }) => (
//   <View style={styles.ratingCard}>
//     <View style={styles.userInfo}>
//       <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
//       <View style={styles.userDetails}>
//         <Text style={styles.userName}>{item.userName}</Text>
//         <Text style={styles.date}>{item.date}</Text>
//       </View>
//     </View>
//     <View style={styles.starRow}>
//       {[...Array(item.rating)].map((_, index) => (
//         <FontAwesome key={index} name="star" size={16} color="#FFD700" />
//       ))}
//     </View>
//     <Text style={styles.comment}>{item.description}</Text>
//   </View>
// );

// // Main component
// const RatingList = () => {
//   const [filteredRatings, setFilteredRatings] = useState(ratings);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [averageRating, setAverageRating] = useState(0);

//   // Count ratings for each star level
//   const countRatingsByStar = (star) =>
//     ratings.filter((item) => item.rating === star).length;

//   useEffect(() => {
//     // Calculate the average rating
//     const totalRating = ratings.reduce((acc, item) => acc + item.rating, 0);
//     const average = (totalRating / ratings.length).toFixed(1); // Round to 1 decimal place
//     setAverageRating(average);
//   }, []);

//   // Filter function
//   const filterByRating = (rating) => {
//     if (rating === "all") {
//       setFilteredRatings(ratings);
//     } else {
//       const filtered = ratings.filter((item) => item.rating === rating);
//       setFilteredRatings(filtered);
//     }
//     setModalVisible(false); // Close modal after filtering
//   };

//   return (
//     <View style={styles.container}>
//       {/* Button to open modal */}
//       <View style={styles.filterContainer}>
//         <Text>
//           Trung bình: {averageRating}
//           <FontAwesome name="star" size={16} color="#FFD700" />
//         </Text>
//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => setModalVisible(true)}
//         >
//           <Text style={styles.filterButtonText}>All</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {/* Option to show all ratings */}
//             <TouchableOpacity
//               style={styles.modalItem}
//               onPress={() => filterByRating("all")}
//             >
//               <Text style={styles.modalItemText}>
//                 All Ratings ({ratings.length})
//               </Text>
//             </TouchableOpacity>

//             {/* Filter options by star ratings */}
//             {[5, 4, 3, 2, 1].map((rating) => (
//               <TouchableOpacity
//                 key={rating}
//                 style={styles.modalItem}
//                 onPress={() => filterByRating(rating)}
//               >
//                 <Text style={styles.modalItemText}>
//                   {/* Hiển thị ngôi sao thay vì số */}
//                   {Array.from({ length: rating }).map((_, index) => (
//                     <FontAwesome
//                       key={index}
//                       name="star"
//                       size={16}
//                       color="#FFD700"
//                     />
//                   ))}{" "}
//                   ({countRatingsByStar(rating)})
//                 </Text>
//               </TouchableOpacity>
//             ))}

//             <Button title="Close" onPress={() => setModalVisible(false)} />
//           </View>
//         </View>
//       </Modal>

//       {/* Display filtered ratings */}
//       <FlatList
//         data={filteredRatings}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <RatingItem item={item} />}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   filterButton: {
//     backgroundColor: "transparent",
//     borderWidth: 0.3,
//     borderColor: "#333",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   filterButtonText: {
//     color: "#333",
//     fontWeight: "bold",
//   },
//   ratingCard: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     backgroundColor: "#f9f9f9",
//   },
//   userInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   userDetails: {
//     flexDirection: "column",
//   },
//   userName: {
//     fontWeight: "bold",
//     fontSize: 16,
//     color: "#333",
//   },
//   date: {
//     fontSize: 12,
//     color: "#888",
//   },
//   starRow: {
//     flexDirection: "row",
//     marginBottom: 5,
//   },
//   comment: {
//     fontSize: 14,
//     color: "#333",
//     marginTop: 5,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingBottom: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     width: "100%",
//   },
//   modalItemText: {
//     fontSize: 16,
//   },
// });

// export default RatingList;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Button,
} from "react-native";
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

// Main component
const RatingList = () => {
  const [filteredRatings, setFilteredRatings] = useState(ratings);
  const [modalVisible, setModalVisible] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [currentFilter, setCurrentFilter] = useState("all"); // New state for current filter

  // Count ratings for each star level
  const countRatingsByStar = (star) =>
    ratings.filter((item) => item.rating === star).length;

  useEffect(() => {
    // Calculate the average rating
    const totalRating = ratings.reduce((acc, item) => acc + item.rating, 0);
    const average = (totalRating / ratings.length).toFixed(1); // Round to 1 decimal place
    setAverageRating(average);
  }, []);

  // Filter function
  const filterByRating = (rating) => {
    if (rating === "all") {
      setFilteredRatings(ratings);
    } else {
      const filtered = ratings.filter((item) => item.rating === rating);
      setFilteredRatings(filtered);
    }
    setCurrentFilter(rating); // Update current filter
    setModalVisible(false); // Close modal after filtering
  };

  return (
    <View style={styles.container}>
      {/* Button to open modal */}
      <View style={styles.filterContainer}>
        <Text>
          Trung bình: {averageRating}
          <FontAwesome name="star" size={16} color="#FFD700" />
        </Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>
            {currentFilter === "all" ? (
              "All"
            ) : (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.filterButtonText}>{currentFilter} </Text>
                <FontAwesome name="star" size={16} color="#FFD700" />
              </View>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Option to show all ratings */}
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => filterByRating("all")}
            >
              <Text style={styles.modalItemText}>
                All Ratings ({ratings.length})
              </Text>
            </TouchableOpacity>

            {/* Filter options by star ratings */}
            {[5, 4, 3, 2, 1].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={styles.modalItem}
                onPress={() => filterByRating(rating)}
              >
                <Text style={styles.modalItemText}>
                  {Array.from({ length: rating }).map((_, index) => (
                    <FontAwesome
                      key={index}
                      name="star"
                      size={16}
                      color="#FFD700"
                    />
                  ))}{" "}
                  ({countRatingsByStar(rating)})
                </Text>
              </TouchableOpacity>
            ))}

            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Display filtered ratings */}
      <FlatList
        data={filteredRatings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RatingItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: "transparent",
    borderWidth: 0.3,
    borderColor: "#333",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default RatingList;
