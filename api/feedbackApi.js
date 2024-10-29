import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createFeedback = async (feedbackData) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); 
    const response = await fetch(`${API_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể tạo feedback");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllFeedback = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken"); 
    const response = await fetch(`${API_URL}/feedback`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy danh sách feedback");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getFeedbackById = async (feedbackId) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); 
    const response = await fetch(`${API_URL}/feedback/${feedbackId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy thông tin feedback");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateFeedback = async (feedbackId, feedbackData) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); 
    const response = await fetch(`${API_URL}/feedback/${feedbackId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể cập nhật feedback");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteFeedback = async (feedbackId) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); 
    const response = await fetch(`${API_URL}/feedback/${feedbackId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể xóa feedback");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getFeedbackByCategory = async (categoryId) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); 
    const response = await fetch(`${API_URL}/feedback/category/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy feedback theo danh mục");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to get feedback for a specific product
export const getFeedbackByProduct = async (productId) => {
  try {
    const token = await AsyncStorage.getItem("userToken"); 
    const response = await fetch(`${API_URL}/feedback/category/product/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy feedback của sản phẩm");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};