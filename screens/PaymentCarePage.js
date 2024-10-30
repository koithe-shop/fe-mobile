import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { changePaymentCareStatus } from "../api/consignmentCareApi"; // Import the API function

const PaymentPage = ({ route, navigation }) => {
  const { consignment, onPaymentSuccess } = route.params; // Destructure the callback function

  const handlePayment = async () => {
    try {
      // Mock API call for payment processing
      Alert.alert("Payment Successful", "Your payment has been processed!");

      // Call the onPaymentSuccess callback if provided
      if (onPaymentSuccess) {
        onPaymentSuccess(); // Refresh the history here
      }

      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      Alert.alert(
        "Payment Failed",
        "There was an issue processing your payment."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>
      <Text style={styles.text}>
        Product: {consignment.productId.productName}
      </Text>
      <Text style={styles.text}>
        Total Amount: {consignment.totalPrice.toLocaleString()} VND
      </Text>
      {/* Add payment methods and other details here */}
      <Button title="Confirm Payment" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PaymentPage;
