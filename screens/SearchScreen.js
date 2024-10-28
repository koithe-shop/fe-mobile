import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

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
    ].slice(0, 5); // Giữ lại 5 tìm kiếm gần nhất
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
    if (!searchText) {
      console.log("Nosearch");
    }
    if (searchText) {
      Keyboard.dismiss();
      saveHistory(searchText);
      navigation.replace("Product", { searchTerm: searchText });
    }
  };

  useEffect(() => {
    loadHistory();
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
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search for Koi"
          style={styles.searchInput}
          value={searchText}
          clearButtonMode="always"
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          autoFocus={true}
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
            style={styles.historyItemContainer} // Mở rộng TouchableOpacity bao toàn bộ item
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  searchInput: {
    // height: 40,
    flex: 1,
    // color: "#000",
    borderColor: "gray",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    // width: "100%",
  },
  historyList: {
    // marginTop: 5,
  },

  historyItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between", // Đảm bảo khoảng cách giữa Text và Icon
  },
  historyItem: {
    fontSize: 16,
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
