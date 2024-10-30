import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/userApi";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null); // State for user info
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  console.log(userInfo);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId"); // Get the user ID from AsyncStorage
        if (userId) {
          const userData = await getUserById(userId); // Fetch user data by ID
          setUserInfo(userData); // Set user data to state
        } else {
          setError("Không tìm thấy thông tin người dùng");
        }
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra khi tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // Call the function
  }, []); // Empty dependency array to run once when the component mounts

  // const userInfo = {
  //   name: "Nguyễn Văn A",
  //   email: "nguyenvana@email.com",
  //   phone: "0912345678",
  //   address: "123 Đường ABC, Quận 1, TP.HCM",
  //   avatar: "https://via.placeholder.com/150",
  // };

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      cardNumber: "**** **** **** 1234",
      expiryDate: "12/25",
    },
    {
      id: 2,
      type: "MasterCard",
      cardNumber: "**** **** **** 5678",
      expiryDate: "08/24",
    },
  ];

  const renderPaymentMethod = (method) => (
    <View key={method.id} style={styles.paymentCard}>
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentType}>{method.type}</Text>
        <Text style={styles.cardNumber}>{method.cardNumber}</Text>
        <Text style={styles.expiryDate}>Hết hạn: {method.expiryDate}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#666" />
    </View>
  );
  const renderAvatar = () => {
    const initial = userInfo?.fullName ? userInfo?.fullName.charAt(0) : "";
    return (
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Image source={{ uri: userInfo?.fullName }} style={styles.avatar} /> */}
        {renderAvatar()}
        <Text style={styles.name}>{userInfo?.fullName}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        {/* <View style={styles.infoItem}>
          <MaterialIcons name="email" size={20} color="#666" />
          <Text style={styles.infoText}>{userInfo.email}</Text>
        </View> */}
        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={20} color="#666" />
          <Text style={styles.infoText}>{userInfo?.phoneNumber}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <Text style={styles.infoText}>{userInfo?.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        {paymentMethods.map(renderPaymentMethod)}
        <TouchableOpacity style={styles.addPaymentButton}>
          <MaterialIcons name="add" size={24} color="#007AFF" />
          <Text style={styles.addPaymentText}>Thêm phương thức thanh toán</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#333", // You can change the background color if needed
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  expiryDate: {
    fontSize: 14,
    color: "#666",
  },
  addPaymentButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  addPaymentText: {
    marginLeft: 10,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
