import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const SearchModal = ({ visible, onClose, navigation }) => {
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
    ].slice(0, 5);
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
      saveHistory(searchText);
      console.log("Searching for:", searchText);
      onClose(); // Close modal
      navigation.navigate("SearchResults", { searchTerm: searchText }); // Navigate to SearchResults
    }
  };

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

  useEffect(() => {
    loadHistory();
  }, [visible]);

  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <TextInput
            placeholder="Search for Koi breeds, blogs, news..."
            style={styles.searchInput}
            value={searchText}
            clearButtonMode="always"
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
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
                <Icon name="clear" size={14} color="#333" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
          style={styles.historyList}
          contentContainerStyle={styles.historyListContent}
        />
      </View>
    </Modal>
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
    borderBottomColor: "#ccc",
    width: "100%", // Make sure it takes full width
  },
  historyItem: {
    fontSize: 16,
    color: "#333",
    flex: 1, // Ensure text takes available space
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
  touchableItem: {
    flex: 1, // This allows the TouchableOpacity to fill the space
    justifyContent: "center", // Center the text vertically
  },
});

export default SearchModal;
