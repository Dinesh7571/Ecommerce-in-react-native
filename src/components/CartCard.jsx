import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
//import CartContext from "../context/CartContext";
import { CartContext } from "../context/CartContext";
const CartCard = ({ item }) => {
  const { removeFromCart, updateCart } = useContext(CartContext);
  const imageUrl =
    "https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/cwlk21f74nd9iamrlzkh.png";

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.itemText}>{item.product.title}</Text>
        <Text style={styles.priceText}>${item.product.price}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.button, item.quantity <= 1 && styles.disabledButton]}
            onPress={() => {
              if (item.quantity > 1) {
                updateCart("decrease", item.product._id);
              }
            }}
            disabled={item.quantity <= 1}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.button, item.quantity >= item.product.stock && styles.disabledButton]}
            onPress={() => updateCart("increase", item.product._id)}
            disabled={item.quantity >= item.product.stock}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.totalText}>${item.product.price * item.quantity}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.product._id)}
        >
          <Image source={require('../assets/deleteIcon.png')} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    color: "gray",
  },
  priceText: {
    fontSize: 16,
    color: "gray",
    textAlign: "right",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  button: {
    backgroundColor: "#ff6347",
    padding: 5,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  quantityText: {
    fontSize: 16,
    color: "gray",
    marginHorizontal: 10,
  },
  totalText: {
    fontSize: 16,
    color: "gray",
    textAlign: "right",
    flex: 1,
  },
  removeButton: {
    alignItems: "center",
    flex: 0.5,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
});
