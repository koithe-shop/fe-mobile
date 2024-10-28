import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderScreen = ({ navigation }) => {
  const orders = [
    {
      id: '1',
      orderNumber: '#ORD001',
      date: '23/10/2024',
      total: '1,250,000₫',
      status: 'Đã giao',
      items: [
        {
          id: '1',
          name: 'Áo thun nam',
          quantity: 2,
          price: '250,000₫',
          image: 'https://via.placeholder.com/100',
        },
        {
          id: '2',
          name: 'Quần jean',
          quantity: 1,
          price: '750,000₫',
          image: 'https://via.placeholder.com/100',
        },
      ],
    },
    {
      id: '2',
      orderNumber: '#ORD002',
      date: '20/10/2024',
      total: '890,000₫',
      status: 'Đang giao',
      items: [
        {
          id: '3',
          name: 'Giày thể thao',
          quantity: 1,
          price: '890,000₫',
          image: 'https://via.placeholder.com/100',
        },
      ],
    },
    {
      id: '3',
      orderNumber: '#ORD003',
      date: '15/10/2024',
      total: '450,000₫',
      status: 'Đã hủy',
      items: [
        {
          id: '4',
          name: 'Áo khoác',
          quantity: 1,
          price: '450,000₫',
          image: 'https://via.placeholder.com/100',
        },
      ],
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đã giao':
        return '#4CAF50';
      case 'Đang giao':
        return '#2196F3';
      case 'Đã hủy':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { order: item })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.itemCount}>{item.items.length} sản phẩm</Text>
      </View>

      <View style={styles.productsContainer}>
        {item.items.map((product, index) => (
          <View key={product.id} style={styles.productItem}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.quantityText}>x{product.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Tổng tiền:</Text>
        <Text style={styles.totalAmount}>{item.total}</Text>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#757575" style={styles.arrow} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch sử đơn hàng</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
