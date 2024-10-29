import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getOrderById } from "../api/orderApi";
import { TouchableOpacity } from "react-native-gesture-handler";

const OrderDetailScreen = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f0ad4e";
      case "Completed":
        return "#5cb85c";
      case "Cancelled":
        return "#d9534f";
      case "Deny":
        return "#292b2c";
      default:
        return "#0275d8";
    }
  };

  const handleProductPress = (productId) => {
    navigation.navigate("ProductDetail", { productId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ba2d32" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#d9534f" />
        <Text style={styles.errorText}>Không tìm thấy thông tin đơn hàng</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          <View style={styles.orderHeader}>
            <Text style={styles.orderId}>Đơn hàng #{order._id.slice(-8)}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(order.status) },
              ]}
            >
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={16} color="#666" />
            <Text style={styles.infoText}>{formatDate(order.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          <View style={styles.customerInfo}>
            <View style={styles.customerRow}>
              <MaterialIcons name="person" size={16} color="#666" />
              <Text style={styles.customerName}>{order.userId.fullName}</Text>
            </View>
            <View style={styles.customerRow}>
              <MaterialIcons name="phone" size={16} color="#666" />
              <Text style={styles.customerPhone}>
                {order.userId.phoneNumber}
              </Text>
            </View>
            <View style={styles.customerRow}>
              <MaterialIcons name="location-on" size={16} color="#666" />
              <Text style={styles.customerAddress}>{order.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {order.products.map((product, index) => (
            <TouchableOpacity
              key={product._id}
              style={[
                styles.productItem,
                index < order.products.length - 1 && styles.productItemBorder,
              ]}
              onPress={() => handleProductPress(product._id)}
              activeOpacity={0.7}
            >
              <Image
                source={{
                  uri: product.image[0] || "https://via.placeholder.com/80",
                }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.productName}</Text>
                <Text style={styles.productDetail}>
                  Size: {product.size} | Gender:{" "}
                  {product.gender ? "Đực" : "Cái"}
                </Text>
                <Text style={styles.productPrice}>
                  {formatPrice(product.price)}
                </Text>
              </View>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#666"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
          <View style={styles.paymentDetail}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Trạng thái thanh toán</Text>
              <View
                style={[
                  styles.paymentStatus,
                  {
                    backgroundColor:
                      order.paymentStatus === "Paid" ? "#5cb85c" : "#f0ad4e",
                  },
                ]}
              >
                <Text style={styles.paymentStatusText}>
                  {order.paymentStatus === "Paid"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Phương thức thanh toán</Text>
              <Text style={styles.paymentValue}>
                {order.paymentMethod || "COD"}
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Tổng tiền hàng</Text>
              <Text style={styles.paymentTotal}>
                {formatPrice(order.totalPrice)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  customerInfo: {
    marginTop: 4,
  },
  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  customerName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  customerPhone: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  customerAddress: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  productItem: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  productItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  productDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ba2d32",
  },
  paymentDetail: {
    marginTop: 4,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666",
  },
  paymentValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  paymentTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ba2d32",
  },
  paymentStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paymentStatusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});

export default OrderDetailScreen;
