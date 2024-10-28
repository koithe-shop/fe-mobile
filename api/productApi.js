import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllProduct = async () => {
  try {
    const response = await fetch(`${API_URL}/products`, {
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
export const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(`${API_URL}/products/category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Không thể lấy sản phẩm theo category ID"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
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

