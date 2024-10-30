import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fetch consignment sale by user ID
export const getConsignmentSaleByUserId = async (userId) => {
  const token = await AsyncStorage.getItem("userToken");

  try {
    const response = await fetch(
      `${API_URL}/consignment_sale/userId/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token if required
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Không thể lấy thông tin ký gửi bán theo user ID"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Create a new consignment sale
export const createConsignmentSale = async (consignmentData) => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${API_URL}/consignment_sale`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
      },
      body: JSON.stringify(consignmentData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể tạo consignment sale");
      } catch (jsonError) {
        const errorText = await response.text();
        console.error("Non-JSON error response:", errorText);
        throw new Error("Server error: " + errorText);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in createConsignmentSale:", error.message);
    throw error;
  }
};

// Change the payment status of a consignment sale
export const changePaymentSaleStatus = async (
  consignmentSaleId,
  paymentStatus
) => {
  const token = await AsyncStorage.getItem("userToken");

  try {
    const response = await fetch(
      `${API_URL}/consignment_sale/change_payment_status/${consignmentSaleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
        },
        body: JSON.stringify({ paymentStatus: paymentStatus }),
      }
    );

    const responseText = await response.text();
    console.log("Raw response text:", responseText);

    if (!response.ok) {
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || "Error changing payment status");
      } catch (jsonError) {
        throw new Error("Error changing payment status: " + responseText);
      }
    }

    const data = JSON.parse(responseText);
    return data;
  } catch (error) {
    console.error("Error in changePaymentSaleStatus:", error.message);
    throw error;
  }
};
