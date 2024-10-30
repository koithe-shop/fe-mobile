// ConsignmentSaleHistory.js
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const ConsignmentSaleHistory = () => {
  // Sample data; replace this with your actual data
  const saleHistory = [
    { id: 1, title: "Cá Koi Nhật", details: "Kích thước: 25cm | Tuổi: 1 năm" },
    { id: 2, title: "Cá Vàng", details: "Kích thước: 15cm | Tuổi: 6 tháng" },
    // Add more items as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Lịch Sử Ký Gửi Bán</Text>
      <ScrollView style={styles.historyContainer}>
        {saleHistory.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDetails}>{item.details}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  itemDetails: {
    fontSize: 14,
    color: "#666",
  },
});

export default ConsignmentSaleHistory;
