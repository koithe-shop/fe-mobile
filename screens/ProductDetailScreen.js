import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import dayjs from "dayjs";

const ProductDetailScreen = ({ navigation }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const product = {
    id: "1",
    name: "Cá Koi Kohaku Premium",
    breed: "Kohaku",
    price: 5000000,
    imageUrl:
      "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
    dateAdded: "2024-03-15",
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate("Cart")}
          >
            <Feather name="shopping-cart" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={handleOptionsPress}
            >
              <MaterialIcons name="more-vert" size={24} color="#fff" />
            </TouchableOpacity>

            {showOptions && (
              <View style={styles.optionsMenu}>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    navigation.navigate("Home");
                    setShowOptions(false);
                  }}
                >
                  <Text>Về trang chủ</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ),
    });
  }, [navigation, showOptions]);

  const handleOptionsPress = () => {
    setShowOptions((prev) => !prev);
  };

  const reviews = [
    {
      name: "Nguyen Van A",
      rating: 5,
      text: "Cá rất đẹp, khỏe mạnh, giao hàng nhanh",
      date: "15/03/2024",
    },
    {
      name: "Tran Thi B",
      rating: 4,
      text: "Cá bơi rất khỏe, màu sắc tươi sáng",
      date: "10/03/2024",
    },
  ];

  const averageRating = 4.5;
  const totalReviews = reviews.length;

  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AntDesign
        key={index}
        name={index < rating ? "star" : "staro"}
        size={16}
        color={index < rating ? "#FFD700" : "#000"}
      />
    ));
  };

  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getRandomColor = (initial) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEEAD",
      "#D4A5A5",
      "#9B59B6",
      "#3498DB",
      "#E67E22",
      "#2ECC71",
    ];
    return colors[initial.charCodeAt(0) % colors.length];
  };

  const handleCheckout = () => {
    navigation.navigate("Checkout", { product });
  };

  return (
    <View style={styles.container}>
      {showOptions && (
        <Pressable
          style={styles.overlay}
          onPress={() => setShowOptions(false)}
        />
      )}

      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate("Cart")}
          >
            <Feather name="shopping-cart" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => setShowOptions(!showOptions)}
            >
              <MaterialIcons name="more-vert" size={24} color="#000" />
            </TouchableOpacity>

            {showOptions && (
              <View style={styles.optionsMenu}>
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    navigation.navigate("Home");
                    setShowOptions(false);
                  }}
                >
                  <Text>Về trang chủ</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View> */}

      <ScrollView style={styles.scrollContent}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.breed}>({product.breed})</Text>
          <Text style={styles.price}>{formattedPrice}</Text>
          <Text style={styles.dateAdded}>
            Ngày đăng: {dayjs(product.dateAdded).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
            <MaterialIcons
              name={isDescriptionExpanded ? "expand-less" : "expand-more"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
          {isDescriptionExpanded && (
            <Text style={styles.description}>
              Đây là một con cá Koi thuộc giống Kohaku. {"\n\n"}
              Đặc điểm nổi bật:{"\n"}• Màu sắc tươi sáng, đặc trưng của dòng
              Kohaku{"\n"}• Vây khỏe mạnh và cân đối{"\n"}• Bơi lội linh hoạt
              {"\n"}• Kích thước phù hợp{"\n\n"}
              Cá được nhập khẩu trực tiếp từ trại cá giống uy tín tại Nhật Bản.
              Đảm bảo sức khỏe và chất lượng khi giao đến tay khách hàng.
            </Text>
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Đánh giá từ khách hàng</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Reviews", { productId: product.id })
              }
            >
              <Text style={styles.viewAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingOverview}>
            <View style={styles.stars}>{renderStars(averageRating)}</View>
            <Text style={styles.ratingText}>
              {averageRating}/5 ({totalReviews} đánh giá)
            </Text>
          </View>
          {reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <View
                style={[
                  styles.reviewerAvatarInitial,
                  { backgroundColor: getRandomColor(getInitial(review.name)) },
                ]}
              >
                <Text style={styles.initialText}>
                  {getInitial(review.name)}
                </Text>
              </View>
              <View style={styles.reviewContent}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={styles.stars}>{renderStars(review.rating)}</View>
                <Text style={styles.reviewText}>{review.text}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm liên quan</Text>
          <View style={styles.relatedProducts}>
            <TouchableOpacity
              style={styles.relatedProductItem}
              onPress={() => navigation.push("ProductDetail")}
            >
              <Image
                source={{
                  uri: "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__65__26169d23c20046ea8754593ffb1b3a9b_grande.png",
                }}
                style={styles.relatedProductImage}
              />
              <Text style={styles.relatedProductName} numberOfLines={1}>
                Koi Fish Similar A
              </Text>
              <Text style={styles.relatedProductBreed}>(Kohaku)</Text>
              <Text style={styles.relatedProductPrice}>5.000.000₫</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.relatedProductItem}
              onPress={() => navigation.push("ProductDetail")}
            >
              <Image
                source={{
                  uri: "https://file.hstatic.net/200000573099/file/thiet_ke_chua_co_ten__66__a862d072cefe43afacd7702dd35a4c36_grande.png",
                }}
                style={styles.relatedProductImage}
              />
              <Text style={styles.relatedProductName} numberOfLines={1}>
                Koi Fish Similar B
              </Text>
              <Text style={styles.relatedProductBreed}>(Sanke)</Text>
              <Text style={styles.relatedProductPrice}>7.000.000₫</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.button, styles.cartButton]}
          onPress={() => navigation.navigate("Cart")}
        >
          <Feather name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buyButton]}
          onPress={handleCheckout}
        >
          <Text style={styles.buyButtonText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    zIndex: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  headerIcon: {
    marginLeft: 16,
  },
  menuContainer: {
    position: "relative",
  },
  optionsMenu: {
    position: "absolute",
    right: 0,
    top: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 150,
    borderWidth: 1,
    borderColor: "#eee",
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  scrollContent: {
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  breed: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: "#ba2d32",
    fontWeight: "bold",
  },
  section: {
    padding: 16,
    borderTopWidth: 8,
    borderTopColor: "#f5f5f5",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAll: {
    color: "#ba2d32",
    fontSize: 14,
  },
  ratingOverview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  stars: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  reviewItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  reviewerAvatarInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#999",
  },
  relatedProducts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  relatedProductItem: {
    width: "48%",
  },
  relatedProductImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedProductName: {
    fontSize: 14,
    marginBottom: 4,
  },
  relatedProductBreed: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  relatedProductPrice: {
    fontSize: 14,
    color: "#ba2d32",
    fontWeight: "bold",
  },
  bottomButtons: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  button: {
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButton: {
    width: 48,
    backgroundColor: "#272d2b",
    marginRight: 16,
  },
  buyButton: { flex: 1, backgroundColor: "#ba2d32" },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateAdded: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
});

export default ProductDetailScreen;
