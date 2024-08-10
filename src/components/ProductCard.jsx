import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../utils/fonts";
import config from '../config.json'
const ProductCard = ({ item, handleProductClick, toggleFavorite }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <Image
        source={{ uri: `${config.backendURL}/products/${item.images[0]}` }}
        style={styles.coverImage}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <View style={styles.likeContainer}>
        <TouchableOpacity
          onPress={() => {
            toggleFavorite(item);
          }}
        >
          {/* Your favorite icon here */}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  coverImage: {
    height: 150,
    width: "100%",
    borderRadius: 20,
    position: "relative",
  },
  contentContainer: {
    borderTopWidth: 0.5,
    borderColor: 'gray',
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  price: {
    color: 'gray',
    fontSize: 14,
    fontFamily: fonts.medium,
  },
});
