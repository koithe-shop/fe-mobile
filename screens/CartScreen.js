import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

const CartScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Cá Koi Kohaku Premium",
      breed: "Kohaku",
      price: 5000000,
      quantity: 1,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
    },
    {
      id: "2",
      name: "Cá Koi Sanke Premium",
      breed: "Sanke",
      price: 7000000,
      quantity: 1,
      imageUrl:
        "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__66__a862d072cefe43afacd7702dd35a4c36_grande.png",
    },
  ]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const toggleItemSelection = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const updateQuantity = (itemId, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const deleteSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    navigation.navigate("Checkout", {
      products: selectedProducts,
      voucher: selectedVoucher,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editButton}>{isEditing ? "Xong" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.cartContent}>
        {cartItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: item.id })
            }
            style={styles.cartItem}
          >
            {isEditing && (
              <CheckBox
                checked={selectedItems.includes(item.id)}
                onPress={() => toggleItemSelection(item.id)}
                containerStyle={styles.checkbox}
              />
            )}
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productBreed}>({item.breed})</Text>
              <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, -1)}
                  style={styles.quantityButton}
                >
                  <AntDesign name="minus" size={20} color="#000" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, 1)}
                  style={styles.quantityButton}
                >
                  <AntDesign name="plus" size={20} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voucherSection}
          onPress={() =>
            navigation.navigate("VoucherSelection", {
              onSelectVoucher: (voucher) => setSelectedVoucher(voucher),
            })
          }
        >
          <View style={styles.voucherLeft}>
            <Feather name="tag" size={20} color="#ba2d32" />
            <Text style={styles.voucherText}>Voucher</Text>
          </View>
          <View style={styles.voucherRight}>
            {selectedVoucher ? (
              <Text style={styles.selectedVoucher}>{selectedVoucher.name}</Text>
            ) : (
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="#666"
              />
            )}
          </View>
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.editingFooter}>
            <CheckBox
              checked={selectedItems.length === cartItems.length}
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 40,
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
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  voucherSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  voucherLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  voucherText: {
    marginLeft: 8,
    fontSize: 16,
  },
  selectedVoucher: {
    color: "#ba2d32",
    fontSize: 14,
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
