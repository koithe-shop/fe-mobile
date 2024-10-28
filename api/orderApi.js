import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createOrder = async (orderData) => {
  try {
    // Retrieve token if needed (uncomment if using authentication)
    // const token = await AsyncStorage.getItem("token"); 

    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Add token if required
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể tạo đơn hàng");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy thông tin đơn hàng");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Add token if required
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể lấy thông tin đơn hàng");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const changePaymentStatus = async (orderId, paymentStatus) => {
  try {
    const response = await fetch(`${API_URL}/orders/change-payment-status/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`, // Add token if required
      },
      body: JSON.stringify({ paymentStatus }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể thay đổi trạng thái thanh toán");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
