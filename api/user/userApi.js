import Config from "react-native-config";
import { API_URL } from "@env";

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
