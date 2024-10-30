import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Product from "../components/Product";
import RatingList from "../components/RatingList";
import { getProductsByCategoryId } from "../api/productApi";
import { getFeedbackByCategory } from "../api/feedbackApi";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; // Ensure you import this
import { getCategoryById } from "../api/categoryApi";

const ProductRoute = ({ products, loading, error }) => {
  if (loading) {
    return <ActivityIndicator size="large" color="#ffca28" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (products.length === 0) {
    return <Text style={styles.noProductText}>Không có sản phẩm</Text>;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id.toString()}
      numColumns={2} // Renders products in two columns
      renderItem={({ item }) => <Product item={item} />} // Calls the Product component
    />
  );
};

const RatingRoute = ({ feedbacks, loading, error }) => (
  <RatingList feedbacks={feedbacks} />
);

export default function BreedDetail({ route, navigation }) {
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const { categoryId } = route.params; // Lấy id từ params
  const [category, setCategory] = useState(null);
  console.log(category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByCategoryId(categoryId);
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbackByCategory(categoryId);
        setFeedbacks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategory = async () => {
      try {
        const fetchedCategory = await getCategoryById(categoryId);
        setCategory(fetchedCategory);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts(); // Call the function only if categoryId is available
      fetchFeedbacks(); // Call the function only if categoryId is available
      fetchCategory();
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => setShowModal(true)} // Show modal when pressed
          >
            <MaterialIcons name="more-vert" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleBackToHome = () => {
    navigation.navigate("Home");
    setShowModal(false); // Close modal after navigating
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "products", title: "Products" },
    { key: "ratings", title: "Ratings" },
  ]);

  const renderScene = SceneMap({
    products: () => (
      <ProductRoute products={products} loading={loading} error={error} />
    ),
    ratings: () => (
      <RatingRoute feedbacks={feedbacks} loading={loading} error={error} />
    ),
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#ffca28" }}
      style={{ backgroundColor: "#ffffff" }}
      labelStyle={{ color: "#000" }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.headerImage}
          source={{
            uri: category?.image,
          }}
        />
        <Text style={styles.breedName}>{category?.categoryName}</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
        renderTabBar={renderTabBar}
      />
      {/* Modal for Options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)} // Handle back button press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToHome}
            >
              <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)} // Close the modal
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
  },
  breedName: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    color: "#fff",
    fontSize: 26,
    padding: 10,
    fontWeight: "bold",
  },
  ratingCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noProductText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#333",
  },
  backButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  closeButton: {
    // backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#f44336",
    fontWeight: "bold",
  },
});
