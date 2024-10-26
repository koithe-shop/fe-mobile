import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import { login } from "../api/user/userApi"; // Import hàm login từ file api
import { API_URL } from "@env";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(
        "Lỗi đăng nhập",
        "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu"
      );
      return;
    }

    setLoading(true); // Kích hoạt trạng thái tải
    try {
      const data = await login(username, password); // Gọi hàm login từ api

      // Kiểm tra xem có thành công không
      if (data) {
        console.log("Login successful:", data);
        // navigation.replace("AppDrawer"); // Chuyển hướng sau khi đăng nhập thành công
      } else {
        Alert.alert("Đăng nhập thất bại", data.message);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert(
        "Đăng nhập thất bại",
        error.message || "Có lỗi xảy ra, vui lòng thử lại sau."
      );
    } finally {
      setLoading(false); // Tắt trạng thái tải
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-login.webp")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.titleApp}>Koi-thé</Text>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng Nhập</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên đăng nhập"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Đăng Nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerButtonText}>Đăng Ký</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ff6347" />
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    padding: 16,
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#ffffffcc",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 6,
  },
  titleApp: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ba2d32",
    marginBottom: 50,
    fontFamily: "sans-serif-condensed",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#ba2d32",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#ba2d32",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  registerButton: {
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ba2d32",
  },
  registerButtonText: {
    color: "#ba2d32",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
