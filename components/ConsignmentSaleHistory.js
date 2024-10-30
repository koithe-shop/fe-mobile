import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { changePaymentCareStatus } from "../api/consignmentCareApi";
import { getConsignmentSaleByUserId } from "../api/consignmentSaleApi";

const ConsignmentCareHistory = () => {
  const [saleHistory, setSaleHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  console.log(saleHistory);

  const fetchConsignmentCareHistory = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const data = await getConsignmentSaleByUserId(userId);
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setSaleHistory(sortedData);
      } else {
        setError("User ID not found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsignmentCareHistory();
  }, []);

  const handlePaymentNavigation = (item) => {
    if (item.paymentStatus === "Pending") {
      navigation.navigate("PaymentPage", {
        consignment: item,
        onPaymentSuccess: fetchConsignmentCareHistory,
      });
    }
  };

  const handleCancel = async (item) => {
    Alert.alert(
      "Confirm Cancellation",
      "Are you sure you want to cancel this consignment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              await changePaymentCareStatus(item._id, "Cancelled");
              setSaleHistory((prevHistory) =>
                prevHistory.map((historyItem) =>
                  historyItem._id === item._id
                    ? { ...historyItem, paymentStatus: "Cancelled" }
                    : historyItem
                )
              );
              Alert.alert("Success", "Consignment cancelled successfully.");
            } catch (err) {
              Alert.alert("Error", "Failed to cancel consignment.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const getPaymentStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return styles.pendingStatus;
      case "Success":
        return styles.successStatus;
      case "Cancelled":
        return styles.cancelledStatus;
      default:
        return {};
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  const handleProductDetailNavigation = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {saleHistory.map((item) => (
        <View key={item._id} style={styles.card}>
          <View style={styles.flexBetween}>
            <TouchableOpacity
              onPress={() => handleProductDetailNavigation(item.productId._id)}
            >
              <Text style={styles.productName}>
                {item.productId.productName}
              </Text>
            </TouchableOpacity>
            {/* <Text style={styles.productName}>{item.productId.productName}</Text> */}
            <Text style={getPaymentStatusStyle(item.paymentStatus)}>
              {item.paymentStatus}
            </Text>
          </View>
          <Text style={styles.careType}>
            Trạng thái: {item.productId.status}
          </Text>

          <Text style={styles.careType}>Sale Type: {item.saleType} </Text>
          <Text style={styles.dates}>
            Created At: {new Date(item.createdAt).toLocaleDateString()}
          </Text>
          <Text>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.priceAgreed)}
          </Text>
          {/* {item.paymentStatus === "Pending" && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => handlePaymentNavigation(item)}
              >
                <Text style={styles.buttonText}>Pay Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancel(item)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )} */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 0 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  productName: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  careType: { fontSize: 14, marginBottom: 4 },
  dates: { fontSize: 14, marginBottom: 4 },
  paymentStatus: { fontSize: 14, marginBottom: 4 },
  pendingStatus: { color: "orange", fontWeight: "bold" },
  successStatus: { color: "green", fontWeight: "bold" },
  cancelledStatus: { color: "red", fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  payButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  flexBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ConsignmentCareHistory;
