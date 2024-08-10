import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { fetchOrders } from '../services/cartServices';
import Header from '../components/Header';

const ReorderScreen = () => {
  const [orders, setOrders] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders().then(data => {
      setOrders(data);
      setLoading(false);
    }).catch(error => {
      setError(error);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error fetching orders: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.productRow}>
        <Text style={styles.productColumn}>{item.products.map(p => p.product.title).join(', ')}</Text>
        <Text style={styles.productColumn}>${item.total}</Text>
        <Text style={styles.productColumn}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.headerRow}>
        <Text style={styles.headerColumn}>ORDERS</Text>
        
        <Text style={styles.headerColumn}>TOTAL</Text>
        <Text style={styles.headerColumn}>STATUS</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  listContainer: {
   
    paddingBottom: 20,
  },
  headerRow: {
    marginTop:20,
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#2e2d42',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  headerColumn: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productColumn: {
    flex: 1,
    textAlign: 'center',
    color: '#333',  // Dark gray text color for visibility against white background
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReorderScreen;
