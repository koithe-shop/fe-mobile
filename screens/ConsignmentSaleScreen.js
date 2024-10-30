import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import ProductForm from "../components/ProductForm";
import CareConsignmentForm from "../components/CareConsignmentForm";
import { getAllGenotypes } from "../api/genotypeApi";
import { getAllCategory } from "../api/categoryApi";
import { createConsignmentCare } from "../api/consignmentCareApi";
import { createProductConsignedCare } from "../api/productApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductFormSale from "../components/ProductFormSale";
import { createConsignmentSale } from "../api/consignmentSaleApi";

export default function ConsignmentSaleScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [productData, setProductData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [consignmentData, setConsignmentData] = useState({});
  const [categories, setCategories] = useState([]);
  const [genotypes, setGenotypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(productData);

  useEffect(() => {
    // Retrieve user ID from AsyncStorage
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };

    const fetchCategories = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchGenotypes = async () => {
      try {
        const data = await getAllGenotypes();
        setGenotypes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
    fetchCategories();
    fetchGenotypes();
  }, []);

  const handleCreateProduct = (data) => {
    setProductData(data);
    setStep(2);
  };

  const handleUpdateProduct = (data) => {
    setProductData(data);
  };

  const handleCheckout = async () => {
    try {
      const productResponse = await createProductConsignedCare({
        categoryId: productData.categoryId,
        character: productData.character,
        description: productData.description,
        foodOnDay: productData.foodOnDay,
        gender: productData.gender,
        genotypeId: productData.genotypeId,
        madeBy: productData.madeBy,
        ownerId: productData.ownerId,
        price: productData.price,
        productName: productData.productName,
        // saleType: "Online",
        size: productData.size,
        yob: productData.yob,
      });

      console.log("Product Response:", productResponse); // Log the raw response

      const productId = productResponse._id; // Extract the product ID directly
      console.log(productId);

      const consignmentResponse = await createConsignmentSale({
        userId: userId,
        productId: productId,
        saleType: productData.saleType,
        priceAgreed: productData.price,
      });

      console.log("Consignment Response:", consignmentResponse); // Log the consignment response

      // Navigate to the Consignment Care History screen with refresh parameter
      navigation.replace("Consignment");
    } catch (error) {
      console.error("Error during checkout:", error.message); // Log error message
      Alert.alert(
        "Checkout Error",
        error.message || "An error occurred during checkout."
      ); // Alert with error message
    }
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyContainer}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Ký gửi bán</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
            </TouchableOpacity>
          </View>

          {step === 1 && (
            <View style={styles.stepContainer}>
              <ProductFormSale
                genotypes={genotypes}
                categories={categories}
                consignmentData={productData}
                onCreateConsignment={handleCreateProduct}
                productData={productData}
                onUpdateProduct={handleUpdateProduct}
              />
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepContainer}>
              <Text style={styles.subHeader}>Xác nhận ký gửi chăm sóc</Text>
              {productData && (
                <View style={styles.confirmationDetails}>
                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Loại bán:</Text>
                    {productData.saleType}
                  </Text>

                  <Text style={styles.detailText}>
                    <Text style={styles.bold}>Sản phẩm:</Text>
                    {productData?.productName}
                  </Text>
                </View>
              )}

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
    paddingBottom: 40,
    backgroundColor: "#FFFFFF",
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
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  confirmationDetails: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
