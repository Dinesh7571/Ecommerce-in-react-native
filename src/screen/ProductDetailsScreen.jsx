import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import config from "../config.json";
import { CartContext } from "../context/CartContext";
import useData from "../hooks/useData";
import UserContext from "../context/UserContext";

const ProductDetailsScreen = () => {
  const user=useContext(UserContext)

  const {addToCart}= useContext(CartContext)
  const route = useRoute();
  
  const product = route.params.item;
  const [image, setImage] = useState(`${config.backendURL}/products/${product.images[0]}`);
  const { data, isLoading, error } = useData(`/products/${product._id}`);

 

  return (
    <LinearGradient colors={["#EAE9EE", "#EAE9EE"]} style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.coverImage} />
        </View>
        <View style={styles.sampleImagesContainer}>
          {data && product.images.map((imageUri, index) => (
            <TouchableOpacity
              style={[
                styles.sampleImageContainer,
                image === `${config.backendURL}/products/${imageUri}` && styles.selectedImageContainer,
              ]}
              key={index}
              onPress={() => setImage(`${config.backendURL}/products/${imageUri}`)}
            >
              <Image source={{ uri: `${config.backendURL}/products/${imageUri}` }} style={styles.sampleImage} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.fontText}>{product.title}</Text>
            <Text style={styles.fontText}>${product.price}</Text>
          </View>
          <Text style={styles.description}>{data && data.description}</Text>
          {/* cart button */}
          <View>
            <TouchableOpacity style={styles.button} onPress={()=>addToCart(product,1)}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    height: 400,
    width:'470'
  },
  coverImage: {
    resizeMode: "cover",
    flex: 1,
  },
  sampleImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  sampleImageContainer: {
    marginHorizontal: 5,
    padding: 2,  // Add padding to create space for the border
  },
  selectedImageContainer: {
    borderColor: 'gray',
    borderWidth: 0.5, 
  },
  sampleImage: {
    height: 70,
    width: 70,
  },
  contentContainer: {
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  sizeText: {
    marginTop: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: "700",
  },
  selectedText: {
    color: "#E55B5B",
  },
  colorContainer: {
    flexDirection: "row",
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
  description: {
    marginTop: 8,
    color: 'gray',
  },
});
