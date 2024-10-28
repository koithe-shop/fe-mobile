import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import { useAsyncStorage } from "../context/AsyncStorageContext";

const CartScreen = ({ navigation }) => {
  const { data: cartItems, saveData } = useAsyncStorage();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? "Xong" : "Sửa"}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing]);

  useEffect(() => {
    if (cartItems) {
      saveData(cartItems);
    }
  }, [cartItems, saveData]);

  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === (cartItems?.length || 0)) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems?.map((item) => item._id) || []);
    }
  };

  const deleteSelectedItems = () => {
    if (cartItems) {
      saveData(cartItems.filter((item) => !selectedItems.includes(item._id)));
      setSelectedItems([]);
    }
  };

  const calculateTotal = () => {
    return (cartItems || []).reduce((total, item) => total + item.price, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleCheckout = () => {
    const selectedProducts = (cartItems || []).filter((item) =>
      selectedItems.includes(item._id)
    );
    navigation.navigate("Checkout", {
      products: selectedProducts,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cartContent}>
        {cartItems?.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: item._id })
            }
            style={styles.cartItem}
          >
            {isEditing && (
              <CheckBox
                checked={selectedItems.includes(item._id)}
                onPress={() => toggleItemSelection(item._id)}
                containerStyle={styles.checkbox}
              />
            )}
            <Image
              source={{
                uri: item.image?.[0]
                  ? item.image[0]
                  : "https://via.placeholder.com/80",
              }}
              style={styles.productImage}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/80";
              }}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.productBreed}>
                ({item.categoryId?.categoryName})
              </Text>
              <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        {isEditing ? (
          <View style={styles.editingFooter}>
            <CheckBox
              checked={selectedItems.length === (cartItems?.length || 0)}
              onPress={toggleSelectAll}
              containerStyle={styles.checkbox}
            />
            <Text style={styles.selectAllText}>Tất cả</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteSelectedItems}
            >
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.checkoutFooter}>
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Tổng tiền:</Text>
              <Text style={styles.totalAmount}>
                {formatPrice(calculateTotal())}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              <Text style={styles.checkoutButtonText}>Mua hàng</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  editButton: {
    color: "#ba2d32",
    fontSize: 16,
  },
  cartContent: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productBreed: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: "#ba2d32",
    fontWeight: "bold",
    marginBottom: 8,
  },
  certificatesInfo: {
    marginTop: 4,
  },
  healthStatus: {
    fontSize: 12,
    color: "#888",
  },
  awards: {
    fontSize: 12,
    color: "#888",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 20,
  },
  editingFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  selectAllText: {
    marginLeft: 8,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#ba2d32",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  checkoutFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ba2d32",
  },
  checkoutButton: {
    backgroundColor: "#ba2d32",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
