import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  Image,
} from "react-native";
import { createBankAccount, getAllBank } from "../api/bankAccountsApi"; // Adjust the import path accordingly
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateBankAccountScreen = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [bankId, setBankId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const bankData = await getAllBank();
        setBanks(bankData);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoadingBanks(false);
      }
    };

    fetchBanks();
  }, []);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId"); // Assuming userId is stored under this key
        if (storedUserId) {
          setUserId(storedUserId);
        } else {
          console.warn("User ID not found in AsyncStorage");
        }
      } catch (error) {
        console.error("Failed to fetch user ID from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleBankSelect = (bank) => {
    setBankId(bank._id); // Use the `_id` for bankId
    setBankName(bank.name);
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    // Check if all required fields are filled
    if (!userId || !bankId || !accountNumber || !ownerName) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true); // Set loading state to true
    const bankAccountData = {
      userId: userId, // Ensure these variables are strings
      bankId: bankId, // Ensure these variables are strings
      accountNumber: accountNumber, // Ensure these variables are strings
      ownerName: ownerName, // Ensure these variables are strings
    };
    console.log(bankAccountData);

    try {
      // Attempt to create the bank account
      const response = await createBankAccount(bankAccountData);

      if (response) {
        Alert.alert("Success", "Bank account created successfully");
        navigation.navigate("Profile"); // Navigate back to Profile screen
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create bank account");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Bank Account</Text>
      {/* <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      /> */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={bankId ? styles.selectedBank : styles.placeholder}>
          {bankId ? `${bankName}` : "Select Bank ID"}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      {/* Modal for selecting bank */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Bank</Text>
            {loadingBanks ? (
              <Text>Loading banks...</Text>
            ) : (
              <FlatList
                data={banks}
                keyExtractor={(item) => item._id} // Use `_id` as the key
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.bankItem}
                    onPress={() => handleBankSelect(item)}
                  >
                    <Image
                      source={{ uri: item.logo }}
                      style={styles.bankLogo}
                    />
                    {/* Display the bank logo */}
                    <Text style={styles.bankName}>{item.name}</Text>
                    {/* Display the bank name */}
                  </TouchableOpacity>
                )}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: "center",
  },
  placeholder: {
    color: "#999",
  },
  selectedBank: {
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 150,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  bankItem: {
    flexDirection: "row", // Align logo and name horizontally
    alignItems: "center",
    paddingVertical: 10,
  },
  bankLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    objectFit: "contain",
  },
  bankName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
  },
});

export default CreateBankAccountScreen;
