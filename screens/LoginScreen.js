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

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Kiểm tra nếu tên đăng nhập hoặc mật khẩu bị bỏ trống
    if (!username || !password) {
      Alert.alert(
        "Lỗi đăng nhập",
        "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu"
      );
      return;
    }

    setLoading(true);

    const validUsername = "admin";
    const validPassword = "123";

    setTimeout(() => {
      setLoading(false);
      if (username === validUsername && password === validPassword) {
        navigation.replace("AppDrawer");
      } else {
        Alert.alert(
          "Đăng nhập thất bại",
          "Tên đăng nhập hoặc mật khẩu không đúng"
        );
        setUsername("");
        setPassword("");
      }
    }, 1500);
  };

  return (
    <ImageBackground
      source={require("../assets/images/background-login.webp")} // Đường dẫn ảnh nền
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

export default LoginScreen;
