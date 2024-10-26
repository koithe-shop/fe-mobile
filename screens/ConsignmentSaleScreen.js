import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

export default function ConsignmentSaleScreen() {
  const [saleType, setSaleType] = useState("");
  const [priceAgreed, setPriceAgreed] = useState("");
  const [inspectionStatus, setInspectionStatus] = useState("");

  const handleCreateSaleConsignment = () => {
    // Logic để thực hiện ký gửi bán
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tạo Ký Gửi Bán</Text>

      <Text style={styles.label}>Loại Bán</Text>
      <TextInput
        style={styles.input}
        placeholder="Offline / Online"
        value={saleType}
        onChangeText={setSaleType}
      />

      <Text style={styles.label}>Giá Thỏa Thuận</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập giá thỏa thuận"
        value={priceAgreed}
        onChangeText={setPriceAgreed}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Trạng Thái Kiểm Tra</Text>
      <TextInput
        style={styles.input}
        placeholder="Pending / Passed / Failed"
        value={inspectionStatus}
        onChangeText={setInspectionStatus}
      />

      <Button title="Tạo Ký Gửi Bán" onPress={handleCreateSaleConsignment} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 16,
  },
});
