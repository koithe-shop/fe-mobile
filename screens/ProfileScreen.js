// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getUserById } from "../api/userApi";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";

// const ProfileScreen = () => {
//   const [userInfo, setUserInfo] = useState(null); // State for user info
//   const [loading, setLoading] = useState(true); // State for loading
//   const [error, setError] = useState(null); // State for error handling
//   const navigation = useNavigation();

//   // Function to fetch user data
//   const fetchUserData = async () => {
//     try {
//       const userId = await AsyncStorage.getItem("userId"); // Get the user ID from AsyncStorage
//       if (userId) {
//         const userData = await getUserById(userId); // Fetch user data by ID
//         setUserInfo(userData); // Set user data to state
//       } else {
//         setError("Không tìm thấy thông tin người dùng");
//       }
//     } catch (err) {
//       setError(err.message || "Có lỗi xảy ra khi tải thông tin người dùng");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Use effect to fetch user data when the component mounts
//   useEffect(() => {
//     fetchUserData(); // Call the function
//   }, []); // Run once when the component mounts

//   // Fetch user data when the screen comes into focus
//   useFocusEffect(
//     React.useCallback(() => {
//       fetchUserData();
//     }, [])
//   );

//   const paymentMethods = [
//     {
//       id: 1,
//       type: "Visa",
//       cardNumber: "**** **** **** 1234",
//       expiryDate: "12/25",
//     },
//     {
//       id: 2,
//       type: "MasterCard",
//       cardNumber: "**** **** **** 5678",
//       expiryDate: "08/24",
//     },
//   ];

//   const renderPaymentMethod = (method) => (
//     <View key={method.id} style={styles.paymentCard}>
//       <View style={styles.paymentInfo}>
//         <Text style={styles.paymentType}>{method.type}</Text>
//         <Text style={styles.cardNumber}>{method.cardNumber}</Text>
//         <Text style={styles.expiryDate}>Hết hạn: {method.expiryDate}</Text>
//       </View>
//       <MaterialIcons name="keyboard-arrow-right" size={24} color="#666" />
//     </View>
//   );

//   const renderAvatar = () => {
//     const initial = userInfo?.fullName ? userInfo?.fullName.charAt(0) : "";
//     return (
//       <View style={styles.avatarContainer}>
//         <Text style={styles.avatarText}>{initial}</Text>
//       </View>
//     );
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         {renderAvatar()}
//         <Text style={styles.name}>{userInfo?.fullName}</Text>
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={() =>
//             navigation.navigate("UpdateUserScreen", { userData: userInfo })
//           }
//         >
//           <Text style={styles.editButtonText}>Chỉnh sửa</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
//         <View style={styles.infoItem}>
//           <MaterialIcons name="phone" size={20} color="#666" />
//           <Text style={styles.infoText}>{userInfo?.phoneNumber}</Text>
//         </View>
//         <View style={styles.infoItem}>
//           <MaterialIcons name="location-on" size={20} color="#666" />
//           <Text style={styles.infoText}>{userInfo?.address}</Text>
//         </View>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
//         {paymentMethods.map(renderPaymentMethod)}
//         <TouchableOpacity
//           style={styles.addPaymentButton}
//           onPress={() => navigation.navigate("CreateBankAccountScreen")}
//         >
//           <MaterialIcons name="add" size={24} color="#007AFF" />
//           <Text style={styles.addPaymentText}>Thêm tài khoản ngân hàng</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   avatarContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#333",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   avatarText: {
//     fontSize: 40,
//     color: "#fff",
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   editButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     backgroundColor: "#007AFF",
//     borderRadius: 20,
//   },
//   editButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   section: {
//     backgroundColor: "#fff",
//     marginTop: 20,
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//   },
//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   infoText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   paymentCard: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   paymentInfo: {
//     flex: 1,
//   },
//   paymentType: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 5,
//   },
//   cardNumber: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 3,
//   },
//   expiryDate: {
//     fontSize: 14,
//     color: "#666",
//   },
//   addPaymentButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 15,
//   },
//   addPaymentText: {
//     marginLeft: 10,
//     color: "#007AFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default ProfileScreen;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/userApi";
import { getBankAccountsByUserId } from "../api/bankAccountsApi"; // Import your API function
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]); // State for bank accounts
  const navigation = useNavigation();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const userData = await getUserById(userId);
        setUserInfo(userData);
      } else {
        setError("Không tìm thấy thông tin người dùng");
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải thông tin người dùng");
    }
  };

  // Function to fetch bank accounts
  const fetchBankAccounts = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        const accounts = await getBankAccountsByUserId(userId); // Fetch bank accounts
        setBankAccounts(accounts);
      } else {
        setError("Không tìm thấy thông tin người dùng");
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi tải tài khoản ngân hàng");
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
    fetchBankAccounts();
  }, []);

  // Fetch user data when the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      fetchBankAccounts();
    }, [])
  );

  const renderBankAccount = (account) => (
    <View key={account._id} style={styles.bankCard}>
      <Image source={{ uri: account.bankId.logo }} style={styles.bankLogo} />
      <View style={styles.bankInfo}>
        <Text style={styles.bankName}>{account.bankId.shortName}</Text>
        <Text style={styles.accountNumber}>
          Số tài khoản: {account.accountNumber}
        </Text>
        <Text style={styles.ownerName}>Chủ tài khoản: {account.ownerName}</Text>
      </View>
    </View>
  );

  const renderAvatar = () => {
    const initial = userInfo?.fullName ? userInfo?.fullName.charAt(0) : "";
    return (
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {renderAvatar()}
        <Text style={styles.name}>{userInfo?.fullName}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("UpdateUserScreen", { userData: userInfo })
          }
        >
          <Text style={styles.editButtonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <View style={styles.infoItem}>
          <MaterialIcons name="phone" size={20} color="#666" />
          <Text style={styles.infoText}>{userInfo?.phoneNumber}</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <Text style={styles.infoText}>{userInfo?.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tài khoản ngân hàng</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : (
          bankAccounts.map(renderBankAccount)
        )}
        <TouchableOpacity
          style={styles.addPaymentButton}
          onPress={() => navigation.navigate("CreateBankAccountScreen")}
        >
          <MaterialIcons name="add" size={24} color="#007AFF" />
          <Text style={styles.addPaymentText}>Thêm tài khoản ngân hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  cardNumber: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  expiryDate: {
    fontSize: 14,
    color: "#666",
  },
  addPaymentButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  addPaymentText: {
    marginLeft: 10,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bankCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  bankLogo: {
    width: 40,
    height: 40,
    objectFit: "contain",
    marginRight: 15,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "600",
  },
  accountNumber: {
    fontSize: 14,
    color: "#666",
  },
  ownerName: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default ProfileScreen;
