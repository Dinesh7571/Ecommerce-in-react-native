import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { addToCartAPI, decreaseProductAPI, getCartAPI, increaseProductAPI, removeFromCartAPI } from "../services/cartServices";
import UserContext from "./UserContext";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
 
  const user=useContext(UserContext)
  const [cart, setCart] = useState([])
  

  const addToCart = (product, quantity) => {
    
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id)
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity })
    } else {
      updatedCart[productIndex].quantity += quantity
    }
    
    setCart(updatedCart)
    addToCartAPI(product._id, quantity).then(res => {
      
      // toast.success("Product Added Succesfully")
       console.log(res)
    }).catch(err => {
      console.log(err)
      // toast.error("Failed To add Product!")
       setCart(cart)
    })
  }


  const removeFromCart = (id) => {
    const oldCart = [...cart]
    const newCart = oldCart.filter(item => item.product._id !== id)
    setCart(newCart)
    removeFromCartAPI(id).catch(err => {
     // toast.error("something went wrong")
     console.log(err)
    })
  }

const updateCart=(type,id)=>{
  const oldCart=[...cart]
  const updatedCart = [...cart]
  const productIndex= updatedCart.findIndex(item=>item.product._id===id)

  if(type==="increase"){
    updatedCart[productIndex].quantity+=1
    setCart(updatedCart)
    increaseProductAPI(id).catch(err=>{
      // toast.error("Something went wrong")
      setCart(oldCart)
    })
  }

  if(type==="decrease"){
    updatedCart[productIndex].quantity-=1
    setCart(updatedCart)
    decreaseProductAPI(id).catch(err=>{
      // toast.error("Something went wrong")
      setCart(oldCart)
    })
  }
}

  const getCart = () => {
    getCartAPI()
      .then(res => {
        setCart(res.data)
      }).catch(err => {
        console.log(err)
        // toast.error("Something went wrong!")
      })

  }
 
  useEffect(() => {
    if (user) {
      getCart()
    }
   
  }, [user])


 
  return <CartContext.Provider value={{cart,setCart,addToCart,removeFromCart,updateCart,getCart}}>{children}</CartContext.Provider>;
};
