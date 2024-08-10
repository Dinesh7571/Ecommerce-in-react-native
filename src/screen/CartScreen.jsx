import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import { fonts } from "../utils/fonts";
import { CartContext } from "../context/CartContext";
import { checkoutAPI } from "../services/cartServices";
const CartScreen = () => {
  const [subTotal, setSubTotal] = useState(0)
  const { cart, removeFromCart,updateCart ,setCart} = useContext(CartContext);
  
  useEffect(() => {
    let total = 0
    cart.forEach(item => {
        total += item.product.price * item.quantity
    });
    setSubTotal(total)
}, [cart])



const checkout=()=>{
  
  const oldCart=[...cart]
  setCart([])
 
  checkoutAPI().then(()=>{
//  toast.success("Order placed Succesfully")
console.log("order successful")
}).catch((e)=>{
  console.log(e)
 // toast.error("something went wrong")
  setCart(oldCart)
})
}


 
  return (
    <LinearGradient colors={["#EAE9EE", "#EAE9EE"]} style={styles.container}>
      <View style={styles.header}>
        <Header isCart={true} />
      </View>
      {cart.length>0?<FlatList
        data={cart}
        renderItem={({ item,quantity }) => (
          <CartCard item={item}  />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 40, paddingBottom: 200 }}
        ListFooterComponent={
          <>
            <View style={styles.bottomContentContainer}>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Total:</Text>
                <Text style={styles.priceText}>${subTotal}</Text>
              </View>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Shpping:</Text>
                <Text style={styles.priceText}>$5.0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Grand Total:</Text>
                <Text style={[styles.priceText, styles.grandPriceText]}>
                  ${subTotal+5}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={checkout} style={styles.button}>
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </>
        }
      />:<></>}
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {},
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "600",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#3C3C3C",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#E96E6E",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: fonts.regular,
  },
});
