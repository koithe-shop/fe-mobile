import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import icon

export default function ConsignmentScreen() {
  const navigation = useNavigation();

  const navigateToConsignmentSaleScreen = () => {
    navigation.navigate("ConsignmentSaleScreen");
  };
  const navigateToConsignmentCareScreen = () => {
    navigation.navigate("ConsignmentCareScreen");
  };

  const navigateToViewConsignments = () => {
    navigation.navigate("ViewConsignments");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Bố cục hàng ngang cho các nút */}
      <View style={styles.buttonRow}>
        {/* Nút Tạo Ký Gửi */}
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToConsignmentSaleScreen}
        >
          {/* <Icon name="add-circle-outline" size={30} color="#FFF" /> */}
          <Text style={styles.buttonText}>Ký gửi bán</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToConsignmentCareScreen}
        >
          {/* <Icon name="add-circle-outline" size={30} color="#FFF" /> */}
          <Text style={styles.buttonText}>Ký gửi chăm sóc</Text>
        </TouchableOpacity>

        {/* Nút Xem Danh Sách Ký Gửi */}
        {/* <TouchableOpacity
          style={styles.button}
          onPress={navigateToViewConsignments}
        >
          <Text style={styles.buttonText}>Xem Danh Sách Ký gửi</Text>
        </TouchableOpacity> */}
      </View>

      {/* Danh sách cá ký gửi gần đây */}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionHeader}>Cá Ký Gửi Gần Đây</Text>
        <View style={styles.fishItem}>
          <Text style={styles.fishName}>Cá Koi Nhật</Text>
          <Text style={styles.fishDetail}>Kích thước: 25cm | Tuổi: 1 năm</Text>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F9F9F9",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row",
    width: "30%", // Căn mỗi nút chiếm khoảng 45% chiều rộng
    gap: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    // marginTop: 5, // Khoảng cách giữa icon và text
    textAlign: "center",
  },
  scrollView: {
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  fishItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  fishName: {
    fontSize: 18,
    fontWeight: "600",
  },
  fishDetail: {
    fontSize: 14,
    color: "#666",
  },
});
