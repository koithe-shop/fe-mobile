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
