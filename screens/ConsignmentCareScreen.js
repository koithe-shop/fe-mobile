import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import ProductForm from "../components/ProductForm";
import CareConsignmentForm from "../components/CareConsignmentForm";

export default function ConsignmentCareScreen({ navigation }) {
  const [step, setStep] = useState(1); // State to manage the current step
  const [productData, setProductData] = useState(null);
  const [productImages, setProductImages] = useState([]); // State to hold images
  const [consignmentData, setConsignmentData] = useState(null); // New state for consignment data

  const handleCreateProduct = (data) => {
    setProductData(data); // Save product data
    setStep(2); // Move to the next step
  };

  const handleImageUpdate = (images) => {
    setProductImages(images); // Update images when selected
  };

  const handleUpdateProduct = (data) => {
    setProductData(data); // Update product data
  };

  const handleCreateCareConsignment = (data) => {
    setConsignmentData(data); // Save consignment data
    console.log("Care consignment created:", data);
    setStep(3); // Move to the next step
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with product:", productData);
    // Proceed with checkout logic here
    navigation.navigate("ConsignmentCareDetail");
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Move back to the previous step, ensuring it doesn't go below 1
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyContainer}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Ký gửi chăm sóc</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
            </TouchableOpacity>
          </View>

          {step === 1 && (
            <View style={styles.stepContainer}>
              <ProductForm
                onCreateProduct={handleCreateProduct}
                onImageUpdate={handleImageUpdate}
                existingImages={productImages}
                productData={productData} // Pass existing product data
                onUpdateProduct={handleUpdateProduct} // Pass function to update product data
              />
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepContainer}>
              <CareConsignmentForm
                onCreateConsignment={handleCreateCareConsignment}
                handleBack={handleBack}
                initialData={consignmentData} // Pass existing consignment data if editing
              />
            </View>
          )}

          {step === 3 && (
            <View style={styles.stepContainer}>
              <Text style={styles.subHeader}>Bạn Chắc chưa?</Text>
              <TouchableOpacity onPress={handleCheckout} style={styles.button}>
                <Text style={styles.buttonText}>Tạo ký gửi chăm sóc</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBack} style={styles.button}>
                <Text style={styles.buttonText}>Trở lại</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyContainer: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#E74C3C",
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  stepContainer: {
    // paddingHorizontal: 20,
    // paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: "#FFFFFF",
    // marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3498DB",
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
