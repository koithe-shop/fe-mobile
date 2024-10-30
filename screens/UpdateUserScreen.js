import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { updateUser } from "../api/userApi"; // Make sure to import your update function
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateUserScreen = ({ route, navigation }) => {
  const { userData } = route.params; // Get user data from navigation params
  const [formData, setFormData] = useState(userData); // Set initial state with user data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(userData);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const result = await updateUser(userData._id, formData); // Call updateUser API
      console.log(result);

      navigation.navigate("Profile"); // Navigate back to ProfileScreen
    } catch (err) {
      setError(err.message || "Cập nhật không thành công");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        placeholder="Tên"
        value={formData.fullName}
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Số điện thoại"
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Địa chỉ"
        value={formData.address}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
        style={styles.input}
      />
      <Button title="Cập nhật" onPress={handleUpdate} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default UpdateUserScreen;
