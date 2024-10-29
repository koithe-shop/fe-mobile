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
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể tạo consignment care");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
