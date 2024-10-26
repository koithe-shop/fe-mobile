// import React, { useEffect, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   Button,
//   View,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import ImagePickerComponent from "./ImagePickerComponent";
// import SelectionModal from "./SelectionModal";

// const ProductForm = ({ onCreateProduct, onImageUpdate, existingImages }) => {
//   // Product states
//   const [productName, setProductName] = useState("Cá Koi Vàng");
//   const [ownerId, setOwnerId] = useState("12345");
//   const [status, setStatus] = useState("Consigned Care");
//   const [madeBy, setMadeBy] = useState("Nông Trại ABC");
//   const [gender, setGender] = useState("true");
//   const [size, setSize] = useState("15");
//   const [yob, setYob] = useState("2020");
//   const [character, setCharacter] = useState("Thân Thiện");
//   const [screeningRate, setScreeningRate] = useState("95");
//   const [foodOnDay, setFoodOnDay] = useState("200");
//   const [description, setDescription] = useState("Mô tả sản phẩm...");
//   const [images, setImages] = useState(existingImages || []); // Initialize with existing images
//   const [price, setPrice] = useState(0);
//   const [categoryId, setCategoryId] = useState("1");
//   const [genotypeId, setGenotypeId] = useState("A1B2C3");

//   // Modal visibility states
//   const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
//   const [isGenotypeModalVisible, setGenotypeModalVisible] = useState(false);
//   const [genderModalVisible, setGenderModalVisible] = useState(false);

//   // Load existing images when component mounts or updates
//   useEffect(() => {
//     if (existingImages) {
//       setImages(existingImages);
//     }
//   }, [existingImages]);

//   // Handle image selection
//   const handleImagesSelected = (selectedImages) => {
//     setImages(selectedImages); // Update local images state
//     onImageUpdate(selectedImages); // Update images in the parent component
//   };

//   // Category, genotype, and gender options
//   const categoryOptions = [
//     { label: "Category 1", value: "1" },
//     { label: "Category 2", value: "2" },
//     { label: "Category 3", value: "3" },
//   ];
//   const genotypeOptions = [
//     { label: "Genotype A", value: "A1B2C3" },
//     { label: "Genotype B", value: "B1C2D3" },
//     { label: "Genotype C", value: "C1D2E3" },
//   ];
//   const genderOptions = [
//     { label: "Male", value: "true" },
//     { label: "Female", value: "false" },
//   ];

//   // Submit product data
//   const handleSubmit = () => {
//     // Validation checks
//     if (!productName || !ownerId) {
//       alert("Please fill in required fields.");
//       return;
//     }
//     if (isNaN(size) || size <= 0) {
//       alert("Kích thước phải là một số dương.");
//       return;
//     }
//     if (isNaN(yob) || yob < 1900 || yob > new Date().getFullYear()) {
//       alert("Năm sinh không hợp lệ.");
//       return;
//     }

//     // Prepare product data
//     const productData = {
//       productName,
//       ownerId,
//       status,
//       madeBy,
//       gender: gender === "true",
//       size,
//       yob,
//       character,
//       screeningRate,
//       foodOnDay,
//       description,
//       price,
//       images, // Use selected images
//       categoryId,
//       genotypeId,
//     };

//     onCreateProduct(productData);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.subHeader}>Thông Tin Cá Koi</Text>
//       <Text style={styles.label}>Tên Sản Phẩm</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập tên sản phẩm"
//         value={productName}
//         onChangeText={setProductName}
//       />
//       <Text style={styles.label}>Nguồn gốc</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nơi sản xuất"
//         value={madeBy}
//         onChangeText={setMadeBy}
//       />
//       <Text style={styles.label}>Giới Tính</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => setGenderModalVisible(true)}
//       >
//         <Text style={styles.buttonText}>
//           {gender === "true" ? "Male" : "Female"}
//         </Text>
//       </TouchableOpacity>
//       <Text style={styles.label}>Kích Thước (cm)</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập kích thước"
//         value={size}
//         onChangeText={setSize}
//         keyboardType="numeric"
//       />
//       <Text style={styles.label}>Năm Sinh</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập năm sinh"
//         value={yob}
//         onChangeText={setYob}
//         keyboardType="numeric"
//       />
//       <Text style={styles.label}>Tính Cách</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập tính cách"
//         value={character}
//         onChangeText={setCharacter}
//       />
//       <Text style={styles.label}>Tỷ Lệ Sàng Lọc</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập tỷ lệ sàng lọc"
//         value={screeningRate}
//         onChangeText={setScreeningRate}
//         keyboardType="numeric"
//       />
//       <Text style={styles.label}>Thức Ăn Mỗi Ngày</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập số lượng thức ăn mỗi ngày"
//         value={foodOnDay}
//         onChangeText={setFoodOnDay}
//         keyboardType="numeric"
//       />
//       <Text style={styles.label}>Mô Tả</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Nhập mô tả sản phẩm"
//         value={description}
//         onChangeText={setDescription}
//       />
//       <Text style={styles.label}>Mã Danh Mục</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => setCategoryModalVisible(true)}
//       >
//         <Text style={styles.buttonText}>
//           {categoryOptions.find((option) => option.value === categoryId)
//             ?.label || "Chọn mã danh mục"}
//         </Text>
//       </TouchableOpacity>
//       <Text style={styles.label}>Mã Genotype</Text>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => setGenotypeModalVisible(true)}
//       >
//         <Text style={styles.buttonText}>
//           {genotypeOptions.find((option) => option.value === genotypeId)
//             ?.label || "Chọn mã genotype"}
//         </Text>
//       </TouchableOpacity>

//       {/* Image Picker */}
//       <Text style={styles.label}>Hình Ảnh</Text>
//       <ImagePickerComponent
//         onImagesSelected={handleImagesSelected}
//         existingImages={images} // Pass images to ImagePickerComponent
//       />

//       <TouchableOpacity style={styles.buttonContinue} onPress={handleSubmit}>
//         <Text style={styles.buttonTextContinue}> Tiếp tục</Text>
//       </TouchableOpacity>

//       {/* Modals */}
//       <SelectionModal
//         visible={isCategoryModalVisible}
//         options={categoryOptions}
//         onSelect={(selected) => setCategoryId(selected.value)}
//         onClose={() => setCategoryModalVisible(false)}
//       />
//       <SelectionModal
//         visible={isGenotypeModalVisible}
//         options={genotypeOptions}
//         onSelect={(selected) => setGenotypeId(selected.value)}
//         onClose={() => setGenotypeModalVisible(false)}
//       />
//       <SelectionModal
//         visible={genderModalVisible}
//         options={genderOptions}
//         onSelect={(selected) => setGender(selected.value)}
//         onClose={() => setGenderModalVisible(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   subHeader: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#555",
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#333",
//   },
//   input: {
//     backgroundColor: "#FFF",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#CCC",
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 8,
//     borderColor: "#ccc",
//     marginBottom: 16,
//     borderWidth: 1,
//   },
//   buttonText: {
//     color: "#333",
//   },
//   buttonContinue: {
//     backgroundColor: "#ba2d32",
//     padding: 15,
//     borderRadius: 8,
//     borderColor: "#ccc",
//     // marginBottom: 16,
//     borderWidth: 1,
//   },
//   buttonTextContinue: {
//     color: "#fff",
//     fontWeight: "800",
//     textAlign: "center",
//   },
// });

// export default ProductForm;

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import ImagePickerComponent from "./ImagePickerComponent";
import SelectionModal from "./SelectionModal";

const ProductForm = ({
  onCreateProduct,
  onImageUpdate,
  existingImages,
  productData, // New prop for existing product data
}) => {
  // Product states, initialized with productData or default values
  const [productName, setProductName] = useState(
    productData?.productName || "Cá Koi Vàng"
  );
  const [ownerId, setOwnerId] = useState(productData?.ownerId || "12345");
  const [status, setStatus] = useState(productData?.status || "Consigned Care");
  const [madeBy, setMadeBy] = useState(productData?.madeBy || "Nông Trại ABC");
  const [gender, setGender] = useState(productData?.gender ? "true" : "false");
  const [size, setSize] = useState(productData?.size || "15");
  const [yob, setYob] = useState(productData?.yob || "2020");
  const [character, setCharacter] = useState(
    productData?.character || "Thân Thiện"
  );
  const [screeningRate, setScreeningRate] = useState(
    productData?.screeningRate || "95"
  );
  const [foodOnDay, setFoodOnDay] = useState(productData?.foodOnDay || "200");
  const [description, setDescription] = useState(
    productData?.description || "Mô tả sản phẩm..."
  );
  const [images, setImages] = useState(existingImages || []); // Initialize with existing images
  const [price, setPrice] = useState(productData?.price || 0);
  const [categoryId, setCategoryId] = useState(productData?.categoryId || "1");
  const [genotypeId, setGenotypeId] = useState(
    productData?.genotypeId || "A1B2C3"
  );

  // Modal visibility states
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isGenotypeModalVisible, setGenotypeModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const categoryOptions = [
    { label: "Category 1", value: "1" },
    { label: "Category 2", value: "2" },
    { label: "Category 3", value: "3" },
  ];
  const genotypeOptions = [
    { label: "Genotype A", value: "A1B2C3" },
    { label: "Genotype B", value: "B1C2D3" },
    { label: "Genotype C", value: "C1D2E3" },
  ];
  const genderOptions = [
    { label: "Male", value: "true" },
    { label: "Female", value: "false" },
  ];

  // Load existing images when component mounts or updates
  useEffect(() => {
    if (existingImages) {
      setImages(existingImages);
    }
  }, [existingImages]);

  // Handle image selection
  const handleImagesSelected = (selectedImages) => {
    setImages(selectedImages); // Update local images state
    onImageUpdate(selectedImages); // Update images in the parent component
  };

  // Submit product data
  const handleSubmit = () => {
    // Validation checks
    if (!productName || !ownerId) {
      alert("Please fill in required fields.");
      return;
    }
    if (isNaN(size) || size <= 0) {
      alert("Kích thước phải là một số dương.");
      return;
    }
    if (isNaN(yob) || yob < 1900 || yob > new Date().getFullYear()) {
      alert("Năm sinh không hợp lệ.");
      return;
    }

    // Prepare product data
    const productDataToSubmit = {
      productName,
      ownerId,
      status,
      madeBy,
      gender: gender === "true",
      size,
      yob,
      character,
      screeningRate,
      foodOnDay,
      description,
      price,
      images, // Use selected images
      categoryId,
      genotypeId,
    };

    onCreateProduct(productDataToSubmit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Thông Tin Cá Koi</Text>
      <Text style={styles.label}>Tên Sản Phẩm</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên sản phẩm"
        value={productName}
        onChangeText={setProductName}
      />
      <Text style={styles.label}>Nguồn gốc</Text>
      <TextInput
        style={styles.input}
        placeholder="Nơi sản xuất"
        value={madeBy}
        onChangeText={setMadeBy}
      />
      <Text style={styles.label}>Giới Tính</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setGenderModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {gender === "true" ? "Male" : "Female"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.label}>Kích Thước (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập kích thước"
        value={size}
        onChangeText={setSize}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Năm Sinh</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập năm sinh"
        value={yob}
        onChangeText={setYob}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Tính Cách</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tính cách"
        value={character}
        onChangeText={setCharacter}
      />
      <Text style={styles.label}>Tỷ Lệ Sàng Lọc</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tỷ lệ sàng lọc"
        value={screeningRate}
        onChangeText={setScreeningRate}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Thức Ăn Mỗi Ngày</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số lượng thức ăn mỗi ngày"
        value={foodOnDay}
        onChangeText={setFoodOnDay}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Mô Tả</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mô tả sản phẩm"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Mã Danh Mục</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCategoryModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {categoryOptions.find((option) => option.value === categoryId)
            ?.label || "Chọn mã danh mục"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.label}>Mã Genotype</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setGenotypeModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {genotypeOptions.find((option) => option.value === genotypeId)
            ?.label || "Chọn mã genotype"}
        </Text>
      </TouchableOpacity>

      {/* Image Picker */}
      <Text style={styles.label}>Hình Ảnh</Text>
      <ImagePickerComponent
        onImagesSelected={handleImagesSelected}
        existingImages={images} // Pass images to ImagePickerComponent
      />

      <TouchableOpacity style={styles.buttonContinue} onPress={handleSubmit}>
        <Text style={styles.buttonTextContinue}> Tiếp tục</Text>
      </TouchableOpacity>

      {/* Modals */}
      <SelectionModal
        visible={isCategoryModalVisible}
        options={categoryOptions}
        onSelect={(selected) => setCategoryId(selected.value)}
        onClose={() => setCategoryModalVisible(false)}
      />
      <SelectionModal
        visible={isGenotypeModalVisible}
        options={genotypeOptions}
        onSelect={(selected) => setGenotypeId(selected.value)}
        onClose={() => setGenotypeModalVisible(false)}
      />
      <SelectionModal
        visible={genderModalVisible}
        options={genderOptions}
        onSelect={(selected) => setGender(selected.value)}
        onClose={() => setGenderModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderColor: "#ccc",
    marginBottom: 16,
    borderWidth: 1,
  },
  buttonText: {
    color: "#333",
  },
  buttonContinue: {
    backgroundColor: "#ba2d32",
    padding: 15,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonTextContinue: {
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
  },
});

export default ProductForm;
