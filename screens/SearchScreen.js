// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { TouchableOpacity } from "react-native-gesture-handler";

// const SearchScreen = ({ navigation }) => {
//   const [searchText, setSearchText] = useState("");
//   const [history, setHistory] = useState([]);

//   const loadHistory = async () => {
//     try {
//       const storedHistory = await AsyncStorage.getItem("search_history");
//       if (storedHistory) {
//         setHistory(JSON.parse(storedHistory));
//       }
//     } catch (error) {
//       console.error("Failed to load search history:", error);
//     }
//   };

//   const saveHistory = async (searchTerm) => {
//     const updatedHistory = [
//       searchTerm,
//       ...history.filter((term) => term !== searchTerm),
//     ].slice(0, 5); // Keep the 5 most recent searches
//     try {
//       await AsyncStorage.setItem(
//         "search_history",
//         JSON.stringify(updatedHistory)
//       );
//       setHistory(updatedHistory);
//     } catch (error) {
//       console.error("Failed to save search history:", error);
//     }
//   };

//   const handleSearch = () => {
//     if (searchText) {
//       saveHistory(searchText);
//       navigation.navigate("SearchResults", { searchTerm: searchText });
//     }
//   };

//   useEffect(() => {
//     loadHistory(); // Load search history when screen is opened
//   }, []);

//   const filteredHistory = history.filter((item) =>
//     item.toLowerCase().includes(searchText.toLowerCase())
//   );
//   const clearHistory = async () => {
//     try {
//       await AsyncStorage.removeItem("search_history");
//       setHistory([]);
//     } catch (error) {
//       console.error("Failed to clear search history:", error);
//     }
//   };

//   const deleteHistoryItem = async (itemToDelete) => {
//     const updatedHistory = history.filter((item) => item !== itemToDelete);
//     try {
//       await AsyncStorage.setItem(
//         "search_history",
//         JSON.stringify(updatedHistory)
//       );
//       setHistory(updatedHistory);
//     } catch (error) {
//       console.error("Failed to delete search history item:", error);
//     }
//   };

//   return (
//     <View style={styles.modalContainer}>
//       <View style={styles.searchContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>

//         <TextInput
//           placeholder="Search for Koi breeds, blogs, news..."
//           style={styles.searchInput}
//           value={searchText}
//           clearButtonMode="always"
//           onChangeText={setSearchText}
//           onSubmitEditing={handleSearch}
//           autoFocus={true} // Automatically open the keyboard
//         />
//         <TouchableOpacity onPress={handleSearch}>
//           <Icon name="search" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {history.length > 0 && (
//         <TouchableOpacity
//           onPress={() => setHistory([])}
//           style={styles.clearButton}
//         >
//           <Text style={styles.clearButtonText}>Clear All History</Text>
//         </TouchableOpacity>
//       )}

//       <FlatList
//         data={filteredHistory}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => {
//               setSearchText(item);
//               handleSearch();
//             }}
//             style={styles.historyItemContainer} // Moved to TouchableOpacity
//           >
//             <Text style={styles.historyItem}>{item}</Text>
//             <TouchableOpacity onPress={() => deleteHistoryItem(item)}>
//               <Icon name="clear" size={24} color="#333" />
//             </TouchableOpacity>
//           </TouchableOpacity>
//         )}
//         style={styles.historyList}
//         contentContainerStyle={styles.historyListContent}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     paddingVertical: 40,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   searchInput: {
//     height: 40,
//     flex: 1,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginHorizontal: 10,
//     paddingHorizontal: 10,
//     borderRadius: 20,
//   },
//   historyList: {
//     marginTop: 10,
//   },
//   historyItemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     width: "100%", // Make sure it takes full width
//     borderBottomColor: "#ccc",
//   },
//   historyItem: {
//     fontSize: 16,
//     flex: 1, // Ensure text takes available space
//     color: "#333",
//   },
//   historyListContent: {
//     paddingBottom: 20,
//   },
//   clearButton: {
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "flex-end",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   clearButtonText: {
//     color: "#ff0000",
//     fontWeight: "500",
//   },
// });

// export default SearchScreen;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem("search_history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load search history:", error);
    }
  };

  const saveHistory = async (searchTerm) => {
    const updatedHistory = [
      searchTerm,
      ...history.filter((term) => term !== searchTerm),
    ].slice(0, 5); // Keep the 5 most recent searches
    try {
      await AsyncStorage.setItem(
        "search_history",
        JSON.stringify(updatedHistory)
      );
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  };

  const handleSearch = () => {
    if (searchText) {
      // Dismiss the keyboard
      Keyboard.dismiss();

      // Save the search and navigate to the results
      saveHistory(searchText);
      navigation.navigate("SearchResults", { searchTerm: searchText });
    }
  };

  useEffect(() => {
    loadHistory(); // Load search history when screen is opened
  }, []);

  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem("search_history");
      setHistory([]);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  };

  const deleteHistoryItem = async (itemToDelete) => {
    const updatedHistory = history.filter((item) => item !== itemToDelete);
    try {
      await AsyncStorage.setItem(
        "search_history",
        JSON.stringify(updatedHistory)
      );
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Failed to delete search history item:", error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <TextInput
          placeholder="Search for Koi breeds, blogs, news..."
          style={styles.searchInput}
          value={searchText}
          clearButtonMode="always"
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          autoFocus={true} // Automatically open the keyboard
        />
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {history.length > 0 && (
        <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All History</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSearchText(item);
              handleSearch();
            }}
            style={styles.historyItemContainer} // Moved to TouchableOpacity
          >
            <Text style={styles.historyItem}>{item}</Text>
            <TouchableOpacity onPress={() => deleteHistoryItem(item)}>
              <Icon name="clear" size={24} color="#333" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        style={styles.historyList}
        contentContainerStyle={styles.historyListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  historyList: {
    marginTop: 10,
  },
  historyItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    width: "100%", // Make sure it takes full width
    borderBottomColor: "#ccc",
  },
  historyItem: {
    fontSize: 16,
    flex: 1, // Ensure text takes available space
    color: "#333",
  },
  historyListContent: {
    paddingBottom: 20,
  },
  clearButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  clearButtonText: {
    color: "#ff0000",
    fontWeight: "500",
  },
});

export default SearchScreen;
