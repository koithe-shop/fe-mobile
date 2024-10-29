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
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { changePaymentStatus, createOrder } from "../api/orderApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAsyncStorage } from "../context/AsyncStorageContext";

const StripePaymentSheet = ({ visible, onClose, onConfirm }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s+/g, '').replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.substring(0, 19);
  };

  const formatExpiry = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const formatCVV = (text) => {
    return text.replace(/\D/g, '').substring(0, 3);
  };

  const validateForm = () => {
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Error', 'Please enter a valid 16-digit card number');
      return false;
    }
    if (expiry.length !== 5) {
      Alert.alert('Error', 'Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (cvv.length !== 3) {
      Alert.alert('Error', 'Please enter a valid 3-digit CVV');
      return false;
    }
    return true;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Payment</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <MaterialIcons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.paymentForm} keyboardShouldPersistTaps="handled">
                <View style={styles.cardNumberContainer}>
                  <MaterialIcons name="credit-card" size={24} color="#666" />
                  <TextInput
                    style={styles.cardNumberInput}
                    value={cardNumber}
                    onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                    placeholder="4242 4242 4242 4242"
                    placeholderTextColor="#bebebe"
                    keyboardType="numeric"
                    maxLength={19}
                  />
                </View>

                <View style={styles.cardDetailsRow}>
                  <View style={styles.expiryContainer}>
                    <Text style={styles.expiryLabel}>EXP</Text>
                    <TextInput
                      style={styles.expiryInput}
                      value={expiry}
                      onChangeText={(text) => setExpiry(formatExpiry(text))}
                      placeholder="12/24"
                      placeholderTextColor="#bebebe"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                  <View style={styles.cvvContainer}>
                  <Text style={styles.cvvLabel}>CVV</Text>
                    <TextInput
                      style={styles.cvvInput}
                      value={cvv}
                      onChangeText={(text) => setCvv(formatCVV(text))}
                      placeholder="123"
                      placeholderTextColor="#bebebe"
                      keyboardType="numeric"
                      maxLength={3}
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.payButton} onPress={handleConfirm}>
                  <Text style={styles.payButtonText}>Pay</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const CheckoutScreen = ({ route, navigation }) => {
  const { products = [] } = route.params;
  const [inputAddress, setInputAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { removeItems } = useAsyncStorage();
  const [showStripeSheet, setShowStripeSheet] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        if (!userToken) {
          navigation.navigate("Login");
          return;
        }
        setToken(userToken);
      } catch (error) {
        console.error("Error retrieving token:", error);
        Alert.alert("Error", "Failed to authenticate. Please login again.");
        navigation.navigate("Login");
      }
    };
    getToken();
  }, []);

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

    const processOrder = async () => {
      const userId = await AsyncStorage.getItem("userId");
  
      const orderData = {
        userId,
        products: products.map((item) => item._id),
        totalPrice: calculateTotal(),
        address: inputAddress,
        paymentMethod,
      };
  
      try {
        const result = await createOrder(orderData, token);
        const orderId = result._id; 
        if (paymentMethod === "stripe") {
          try {
            await changePaymentStatus(orderId, "Success");
          } catch (error) {
            console.error("Error updating payment status:", error);
            Alert.alert(
              "Warning",
              "Đơn hàng đã được tạo nhưng có lỗi khi cập nhật trạng thái thanh toán"
            );
          }
        }
        await removeItems(products.map(item => item._id));
        
        Alert.alert(
          "Success", 
          `Đặt hàng thành công${paymentMethod === "stripe" ? " và đã thanh toán" : ""}!`
        );
        
        navigation.navigate("OrderStack");
      } catch (error) {
        Alert.alert(
          "Error",
          error.message || "Không thể đặt hàng. Vui lòng thử lại sau."
        );
      }
    };
  

    const handlePlaceOrder = async () => {
      if (!inputAddress) {
        Alert.alert("Lỗi", "Vui lòng nhập địa chỉ giao hàng.");
        return;
      }
  
      if (paymentMethod === "stripe") {
        setShowStripeSheet(true);
        return;
      }
  
      await processOrder();
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

          <StripePaymentSheet
          visible={showStripeSheet}
          onClose={() => setShowStripeSheet(false)}
          onConfirm={async () => {
            setShowStripeSheet(false);
            await processOrder();
          }}
        />

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
  modalContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
    maxHeight: '95%', 
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  paymentForm: {
    flexGrow: 0,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  cardNumberInput: {
    fontSize: 17,
    marginLeft: 12,
    flex: 1,
    color: '#262626',
    paddingVertical: 8,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  expiryContainer: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
    backgroundColor: '#fff',
  },
  expiryLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8, 
  },
  expiryInput: {
    fontSize: 17,
    color: '#262626',
    flex: 1, 
  },
  cvvContainer: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  cvvLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  cvvInput: {
    fontSize: 17,
    color: '#262626',
    flex: 1,
  },
  payButton: {
    backgroundColor: '#ba2d32',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
    shadowColor: "#ba2d32",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

});

export default CheckoutScreen;
