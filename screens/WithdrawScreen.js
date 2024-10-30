import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getBankAccountsByUserId } from "../api/bankAccountsApi"; // Adjust the import path
import { createWithdraw, createWithdrawal } from "../api/withdrawApi"; // Adjust the import path

const WithdrawScreen = () => {
  const [userId, setUserId] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedBankAccountId, setSelectedBankAccountId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { consignmentId } = route.params; // Get consignmentSaleId from navigation params

  useEffect(() => {
    const fetchUserIdAndBankAccounts = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          setUserId(id);
          const accounts = await getBankAccountsByUserId(id);
          setBankAccounts(accounts);
        } else {
          setError("User ID not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdAndBankAccounts();
  }, []);

  const handleWithdraw = async () => {
    if (!selectedBankAccountId) {
      Alert.alert("Error", "Please select a bank account.");
      return;
    }

    const withdrawData = {
      userId,
      bankAccountId: selectedBankAccountId,
      consignmentSaleId: consignmentId, // Ensure this is defined
    };
    try {
      const result = await createWithdrawal(withdrawData);
      console.log(result);

      Alert.alert("Success", "Withdrawal request submitted successfully.");
      navigation.goBack(); // Navigate back after success
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  const renderBankAccount = (account) => (
    <TouchableOpacity
      key={account._id}
      style={[
        styles.accountButton,
        selectedBankAccountId === account._id && styles.selectedAccount,
      ]}
      onPress={() => setSelectedBankAccountId(account._id)}
    >
      <View style={styles.bankCard}>
        <Image source={{ uri: account.bankId.logo }} style={styles.bankLogo} />
        <View style={styles.bankInfo}>
          <Text style={styles.bankName}>{account.bankId.shortName}</Text>
          <Text style={styles.accountNumber}>
            Số tài khoản: {account.accountNumber}
          </Text>
          <Text style={styles.ownerName}>
            Chủ tài khoản: {account.ownerName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Yêu cầu rút tiền</Text>

      <Text style={styles.label}>Chọn ngân hàng:</Text>
      {bankAccounts.map(renderBankAccount)}

      <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "red", fontSize: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  accountButton: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedAccount: {
    backgroundColor: "#c0e0ff",
  },
  bankCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: { fontSize: 16, fontWeight: "bold" },
  accountNumber: { fontSize: 14 },
  ownerName: { fontSize: 14 },
  withdrawButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default WithdrawScreen;
