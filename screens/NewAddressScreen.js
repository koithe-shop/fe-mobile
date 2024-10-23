import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NewAddressScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      return;
    }
    
    navigation.navigate('ShippingAddress', { newAddress: formData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Địa chỉ mới</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Họ tên</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Nhập họ tên"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            placeholder="Nhập địa chỉ cụ thể"
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Hoàn thành</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
},
headerTitle: {
  flex: 1,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000',
},
content: {
  flex: 1,
  padding: 16,
},
formGroup: {
  marginBottom: 16,
},
label: {
  fontSize: 16,
  marginBottom: 8,
  color: '#333',
},
input: {
  borderWidth: 1,
  borderColor: '#e0e0e0',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: '#f9f9f9',
},
addressInput: {
  height: 80,
  textAlignVertical: 'top',
},
footer: {
  padding: 16,
  borderTopWidth: 1,
  borderTopColor: '#e0e0e0',
},
saveButton: {
  backgroundColor: '#007BFF',
  paddingVertical: 16,
  borderRadius: 8,
  alignItems: 'center',
},
saveButtonText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
});

export default NewAddressScreen;
