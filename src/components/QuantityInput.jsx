import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantityInput = ({ quantity, setQuantity, stock, cartPage, productId }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        disabled={quantity <= 1}
        onPress={() => {
          cartPage ? setQuantity('decrease', productId) : setQuantity(quantity - 1);
        }}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity
        style={styles.button}
        disabled={quantity >= stock}
        onPress={() => {
          cartPage ? setQuantity('increase', productId) : setQuantity(quantity + 1);
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
  },
});

export default QuantityInput;
