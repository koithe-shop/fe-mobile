  import React, { useState, useEffect } from 'react';
  import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl,
  } from 'react-native';
  import { MaterialIcons } from '@expo/vector-icons';
  import { getAllOrders } from '../api/orderApi';

  const OrderScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Pending');
    const [refreshing, setRefreshing] = useState(false);

    const tabs = ['Pending', 'Completed', 'Cancelled', 'Deny'];

    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchOrders();
    }, []);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchOrders().then(() => setRefreshing(false));
    }, []);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    };

    const formatPrice = (price) =>
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);

    const getStatusColor = (status) => {
      switch (status) {
        case 'Pending':
          return '#f0ad4e';
        case 'Completed':
          return '#5cb85c';
        case 'Cancelled':
          return '#d9534f';
        case 'Deny':
          return '#292b2c';
        default:
          return '#0275d8';
      }
    };

    const filteredOrders = orders.filter((order) => order.status === activeTab);

    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ba2d32" />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.content}
        >
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <TouchableOpacity
                key={order._id}
                style={styles.orderCard}
                onPress={() => navigation.navigate('OrderDetail', { orderId: order._id })}
              >
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>Đơn hàng #{order._id.slice(-8)}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(order.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>

                <View style={styles.orderInfo}>
                  <View style={styles.infoRow}>
                    <MaterialIcons name="access-time" size={16} color="#666" />
                    <Text style={styles.infoText}>
                      {formatDate(order.createdAt)}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialIcons name="location-on" size={16} color="#666" />
                    <Text style={styles.infoText} numberOfLines={1}>
                      {order.address}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialIcons name="payment" size={16} color="#666" />
                    <Text style={styles.infoText}>
                      {order.paymentStatus}
                    </Text>
                  </View>

                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Tổng tiền:</Text>
                    <Text style={styles.totalValue}>
                      {formatPrice(order.totalPrice)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="shopping-cart" size={48} color="#ccc" />
              <Text style={styles.emptyText}>
                Không có đơn hàng nào trong trạng thái {activeTab}
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContainer: {
      backgroundColor: '#fff',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    tab: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginHorizontal: 4,
      borderRadius: 20,
      backgroundColor: '#f5f5f5',
    },
    activeTab: {
      backgroundColor: '#ba2d32',
    },
    tabText: {
      fontSize: 14,
      color: '#666',
    },
    activeTabText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      padding: 16,
    },
    orderCard: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    orderId: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    orderInfo: {
      marginTop: 8,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    infoText: {
      marginLeft: 8,
      color: '#666',
      flex: 1,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    totalLabel: {
      fontSize: 14,
      color: '#666',
    },
    totalValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#ba2d32',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      marginTop: 60,
    },
    emptyText: {
      marginTop: 16,
      color: '#666',
      textAlign: 'center',
    },
  });

  export default OrderScreen;