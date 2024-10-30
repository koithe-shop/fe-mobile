import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to create a bank account
export const createBankAccount = async (bankAccountData) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); // Assuming you store a token for authorization
    const response = await fetch(`${API_URL}/bankAccounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
      body: JSON.stringify(bankAccountData),
    });

    // Check if response is not ok
    if (!response.ok) {
      const errorData = await response.text(); // Get response as text to see raw data
      console.error("Error response from API:", errorData); // Log the error response for debugging
      throw new Error(errorData || "Không thể tạo tài khoản ngân hàng");
    }

    // Parse the response as JSON
    const data = await response.json();
    return data; // Return the created bank account data
  } catch (error) {
    console.error("Error in createBankAccount:", error); // Log the error for debugging
    throw error;
  }
};

// Function to get bank accounts by user ID
export const getBankAccountsByUserId = async (userId) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); // Assuming you store a token for authorization
    const response = await fetch(`${API_URL}/bankAccounts/userId/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy tài khoản ngân hàng");
    }

    const data = await response.json();
    return data; // Return the retrieved bank accounts
  } catch (error) {
    throw error;
  }
};
export const getAllBank = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${API_URL}/banks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy thông tin Banks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
