import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { getProductById, getProductsByCategoryId } from "../api/productApi";
import { useAsyncStorage } from "../context/AsyncStorageContext";

const DetailItem = ({ label, value }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ProductDetailScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const { data: cartItems, saveData } = useAsyncStorage();

  console.log(productId);

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={[styles.headerRight, { zIndex: 999 }]}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate("Cart")}
          >
            <Feather name="shopping-cart" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={[styles.menuContainer, { position: "relative" }]}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={handleOptionsPress}
            >
              <MaterialIcons name="more-vert" size={24} color="#fff" />
            </TouchableOpacity>

            {showOptions && (
              <>
                <Pressable
                  style={styles.overlay}
                  onPress={() => setShowOptions(false)}
                />
                <View style={[styles.optionsMenu, { zIndex: 9999 }]}>
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
              </>
            )}
          </View>
        </View>
      ),
    });
  }, [navigation, showOptions]);

  const handleOptionsPress = () => {
    setShowOptions((prev) => !prev);
  };

  const fetchProductDetails = async (id) => {
    try {
      setLoading(true);
      const productData = await getProductById(id);
      console.log("Fetched Product Data:", productData);
      setProduct(productData);

      if (productData?.categoryId?._id) {
        const relatedData = await getProductsByCategoryId(
          productData.categoryId._id
        );
        console.log("Related Products Data:", relatedData);
        const filteredRelated = relatedData
          .filter((item) => item._id !== productId)
          .slice(0, 2);
        setRelatedProducts(filteredRelated);
      }

      setError(null);
    } catch (err) {
      setError(err.message || "Không thể tải thông tin sản phẩm");
    } finally {
      setLoading(false);
    }
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
    const selectedProduct = product;
    navigation.navigate("Checkout", {
      products: [selectedProduct],
    });
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      Available: "Còn hàng",
      Sold: "Đã bán",
      Unavailable: "Không khả dụng",
      "Consigned Sale": "Ký gửi bán",
      "Consigned Sold": "Đã bán (Ký gửi)",
      "Consigned Care": "Đang chăm sóc",
      "Consigned Returned": "Đã trả lại",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      Available: "#2ECC71",
      Sold: "#ba2d32",
      Unavailable: "#95a5a6",
      "Consigned Sale": "#3498db",
      "Consigned Sold": "#e74c3c",
      "Consigned Care": "#f39c12",
      "Consigned Returned": "#8e44ad",
    };
    return colorMap[status] || "#000000";
  };

  const StatusDisplay = ({ status }) => (
    <Text style={styles.status}>
      Trạng thái:{" "}
      <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
        {getStatusDisplay(status)}
      </Text>
    </Text>
  );

  const ProductDetails = ({ product }) => (
    <>
      <View style={styles.detailsGrid}>
        <DetailItem label="Xuất xứ" value={product.madeBy} />
        <DetailItem label="Giới tính" value={product.gender ? "Đực" : "Cái"} />
        <DetailItem label="Kích thước" value={`${product.size} cm`} />
        <DetailItem label="Năm sinh" value={product.yob} />
        <DetailItem
          label="Tỷ lệ sàng lọc"
          value={`${product.screeningRate}%`}
        />
        <DetailItem label="Số bữa/ngày" value={product.foodOnDay} />
        <DetailItem label="Genotype" value={product.genotypeId?.genotypeName} />
      </View>

      {product.certificates && (
        <View style={styles.certificates}>
          <Text style={styles.certificateTitle}>Chứng nhận:</Text>
          <Text>• Xuất xứ: {product.certificates.origin}</Text>
          <Text>
            • Tình trạng sức khỏe: {product.certificates.health_status}
          </Text>
          {product.certificates.awards?.length > 0 && (
            <View>
              <Text>• Giải thưởng:</Text>
              {product.certificates.awards.map((award, index) => (
                <Text key={index} style={styles.awardItem}>
                  {" "}
                  - {award}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </>
  );
  const handleAddToCart = () => {
    if (product) {
      if (cartItems) {
        const existingItem = cartItems.find((item) => item._id === product._id);
        if (existingItem) {
          Alert.alert("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng");
        } else {
          saveData([...cartItems, { ...product, quantity: 1 }]);
          Alert.alert("Thông báo", "Thêm vào giỏ hàng thành công");
        }
      } else {
        saveData([{ ...product, quantity: 1 }]);
        Alert.alert("Thông báo", "Thêm vào giỏ hàng thành công");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ba2d32" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchProductDetails}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text>Không tìm thấy sản phẩm</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showOptions && (
        <Pressable
          style={styles.overlay}
          onPress={() => setShowOptions(false)}
        />
      )}

      <ScrollView style={styles.scrollContent}>
        <Image
          source={{
            uri: product.image?.[0] || "https://via.placeholder.com/300",
          }}
          style={styles.productImage}
          resizeMode="cover"
          onError={(e) => {
            e.nativeEvent.target.src = "https://via.placeholder.com/300";
          }}
        />

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.productName}</Text>
          <StatusDisplay status={product.status} />
          <Text style={styles.breed}>({product.categoryId?.categoryName})</Text>
          <Text style={styles.price}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
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
            <View style={styles.expandedContent}>
              <Text style={styles.subtitle}>Thông tin chung:</Text>
              <ProductDetails product={product} />

              <Text style={styles.subtitle}>Mô tả:</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Đánh giá từ khách hàng</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Reviews", { productId: product._id })
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

        {relatedProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sản phẩm liên quan</Text>
            <View style={styles.relatedProducts}>
              {relatedProducts.map((relatedProduct) => (
                <TouchableOpacity
                  key={relatedProduct._id}
                  style={styles.relatedProductItem}
                  onPress={() =>
                    navigation.push("ProductDetail", {
                      productId: relatedProduct._id,
                    })
                  }
                >
                  <Image
                    source={{ uri: relatedProduct.image[0] }}
                    style={styles.relatedProductImage}
                  />
                  <Text style={styles.relatedProductName} numberOfLines={1}>
                    {relatedProduct.productName}
                  </Text>
                  <Text style={styles.relatedProductBreed}>
                    ({relatedProduct.categoryId?.categoryName})
                  </Text>
                  <Text style={styles.relatedProductPrice}>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(relatedProduct.price)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.button, styles.cartButton]}
          onPress={handleAddToCart}
        >
          <Feather name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buyButton]}
          onPress={handleCheckout}
          disabled={product.status === "Sold"}
        >
          <Text style={styles.buyButtonText}>
            {product.status === "Sold" ? "Đã bán" : "Mua ngay"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#ba2d32",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#ba2d32",
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
    zIndex: 999,
  },
  optionsMenu: {
    position: "absolute",
    right: 0,
    top: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 150,
    borderWidth: 1,
    borderColor: "#eee",
  },
  overlay: {
    position: "absolute",
    top: -60,
    left: -20,
    right: -20,
    bottom: -1000,
    backgroundColor: "transparent",
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  scrollContent: {
    flex: 1,
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
  statusText: {
    fontWeight: "bold",
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
    marginBottom: 16,
  },
  expandedContent: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 16,
  },
  detailsGrid: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
  },
  awardItem: {
    marginLeft: 8,
    marginTop: 4,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  certificates: {
    marginTop: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
  },
  certificateTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  section: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
    marginTop: 8,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  reviewerAvatarInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
    color: "#333",
    marginTop: 4,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  relatedProducts: {
    flexDirection: "row",
    marginTop: 12,
    gap: 16,
  },
  relatedProductItem: {
    flex: 1,
    maxWidth: "48%",
  },
  relatedProductImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedProductName: {
    fontSize: 14,
    fontWeight: "bold",
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
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButton: {
    backgroundColor: "#333",
    width: 48,
    marginRight: 16,
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#ba2d32",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
