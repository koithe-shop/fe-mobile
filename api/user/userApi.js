import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Đăng nhập không thành công");
    }

    const data = await response.json();
    return data; // Trả về dữ liệu từ server
  } catch (error) {
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};

export const getUserById = async (userId, token) => {
  console.log(userId);
  console.log(token);

  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });
    // console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Không thể lấy thông tin người dùng"
      );
    }

    const data = await response.json();
    return data; // Return user data from the server
  } catch (error) {
    throw error; // Throw error for external handling
  }
};
