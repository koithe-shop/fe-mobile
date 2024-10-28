import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { createOrder } from "../api/orderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAsyncStorage } from "../context/AsyncStorageContext";

const CheckoutScreen = ({ route, navigation }) => {
  const { products = [] } = route.params;
  const [inputAddress, setInputAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { removeItems } = useAsyncStorage();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="more-horiz" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const calculateSubtotal = () =>
    products.reduce((total, item) => total + item.price, 0);
  const calculateShipping = () => 50000;
  const calculateTotal = () => calculateSubtotal() + calculateShipping();

  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handlePlaceOrder = async () => {
    if (!inputAddress) {
      Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng.");
      return;
    }

    const userId = await AsyncStorage.getItem("userId");

    const orderData = {
      userId,
      products: products.map((item) => item._id),
      totalPrice: calculateTotal(),
      address: inputAddress,
    };

    try {
      const result = await createOrder(orderData);
      await removeItems(products.map(item => item._id));
      Alert.alert("Success", "Đặt hàng thành công!");
      navigation.navigate("OrderStack");
    } catch (error) {
      Alert.alert(
        "Error",
        error.message || "Không thể đặt hàng. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="location-on" size={24} color="#ba2d32" />
              <Text style={styles.sectionTitle}>Địa chỉ nhận hàng</Text>
            </View>
            <TextInput
              style={styles.inputText}
              placeholder="Nhập địa chỉ của bạn"
              value={inputAddress}
              onChangeText={setInputAddress}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sản phẩm đã chọn</Text>
            <ScrollView>
              {products && products.length > 0 ? (
                products.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() =>
                      navigation.navigate("ProductDetail", {
                        productId: item._id,
                      })
                    }
                    style={styles.productItem}
                  >
                    <Image
                      source={{
                        uri: item.image?.[0] || "https://via.placeholder.com/80",
                      }}
                      style={styles.productImage}
                      resizeMode="cover"
                      onError={(e) => {
                        e.nativeEvent.target.src = "https://via.placeholder.com/80";
                      }}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{item.productName}</Text>
                      <Text style={styles.productBreed}>
                        ({item.categoryId?.categoryName})
                      </Text>
                      <Text style={styles.productPrice}>
                        {formatPrice(item.price)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No products found</Text>
              )}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "cod" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("cod")}
            >
              <MaterialIcons name="money" size={24} color="#666" />
              <Text style={styles.paymentText}>Thanh toán khi nhận hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "stripe" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("stripe")}
            >
              <MaterialIcons name="credit-card" size={24} color="#666" />
              <Text style={styles.paymentText}>Thanh toán bằng Stripe</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
            <View style={styles.paymentDetail}>
              <Text style={styles.paymentLabel}>Tổng tiền hàng</Text>
              <Text style={styles.paymentValue}>
                {formatPrice(calculateSubtotal())}
              </Text>
            </View>
            <View style={styles.paymentDetail}>
              <Text style={styles.paymentLabel}>Phí vận chuyển</Text>
              <Text style={styles.paymentValue}>
                {formatPrice(calculateShipping())}
              </Text>
            </View>
            <View style={[styles.paymentDetail, styles.totalDetail]}>
              <Text style={styles.totalLabel}>Tổng thanh toán</Text>
              <Text style={styles.totalValue}>
                {formatPrice(calculateTotal())}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerTotal}>
            <Text style={styles.footerTotalLabel}>Tổng thanh toán</Text>
            <Text style={styles.footerTotalValue}>
              {formatPrice(calculateTotal())}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handlePlaceOrder}
            disabled={!inputAddress}
          >
            <Text style={styles.orderButtonText}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",

    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#f5f5f5",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginTop: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  addressInfo: {
    marginVertical: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  addressPhone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  addressDetail: {
    fontSize: 14,
    color: "#666",
  },
  addAddress: {
    color: "#ba2d32",
    fontSize: 16,
  },
  productItem: {
    flexDirection: "row",
    marginTop: 12,
    paddingBottom: 12,
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
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productBreed: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: "#ba2d32",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    marginTop: 8,
  },
  selectedPayment: {
    borderColor: "#ba2d32",
    backgroundColor: "#fff5f5",
  },
  paymentText: {
    marginLeft: 12,
    fontSize: 16,
  },
  paymentDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#666",
  },
  paymentValue: {
    fontSize: 14,
  },
  totalDetail: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ba2d32",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  footerTotal: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 14,
    color: "#666",
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ba2d32",
  },
  orderButton: {
    backgroundColor: "#ba2d32",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckoutScreen;
