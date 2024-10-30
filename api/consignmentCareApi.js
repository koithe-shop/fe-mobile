import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllConsignmentCare = async () => {
  try {
    const response = await fetch(`${API_URL}/consignment_care`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy thông tin Product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const getConsignmentCareByUserId = async (userId) => {
  const token = await AsyncStorage.getItem("userToken");

  try {
    const response = await fetch(
      `${API_URL}/consignment_care/userId/${userId}`,
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
        errorData.message || "Không thể lấy thông tin ký gửi theo user ID"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createConsignmentCare = async (consignmentData) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); // Retrieve token if needed
    const response = await fetch(`${API_URL}/consignment_care`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
      },
      body: JSON.stringify(consignmentData),
    });

    if (!response.ok) {
      // Attempt to parse error as JSON; if not JSON, throw as text.
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || "Không thể tạo consignment care");
      } catch (jsonError) {
        const errorText = await response.text(); // Log non-JSON error message
        console.error("Non-JSON error response:", errorText);
        throw new Error("Server error: " + errorText);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in createConsignmentCare:", error.message);
    throw error;
  }
};
export const changePaymentCareStatus = async (
  consignmentCareId,
  paymentStatus
) => {
  const token = await AsyncStorage.getItem("userToken"); // Retrieve token if needed
  try {
    const response = await fetch(
      `${API_URL}/consignment_care/change_payment_status/${consignmentCareId}`,
      {
        method: "PUT", // Use the appropriate method (PATCH, PUT, etc.)
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if available
        },
        body: JSON.stringify({ paymentStatus: paymentStatus }),
      }
    );

    // Log the raw response textd
    const responseText = await response.text();
    console.log("Raw response text:", responseText); // Log the raw response

    if (!response.ok) {
      // Attempt to parse error as JSON; if not JSON, throw as text.
      try {
        const errorData = JSON.parse(responseText);
        throw new Error(errorData.message || "Error changing payment status");
      } catch (jsonError) {
        throw new Error("Error changing payment status: " + responseText);
      }
    }

    const data = JSON.parse(responseText); // Parse JSON after checking if response is okay
    return data;
  } catch (error) {
    console.error("Error in changePaymentStatus:", error.message);
    throw error;
  }
};
