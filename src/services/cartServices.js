import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/api-client";
import { getJwt } from "./userServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export async function getAuthHeaders() {
  const token = await getJwt();
  return {
    headers: {
      'x-auth-token': token,
    },
  };
}

export async function addToCartAPI(id, quantity) {
 
    const headers = await getAuthHeaders();
    await apiClient.post(`/cart/${id}`, { quantity }, headers);
    console.log("added to cart");
  
}

export async function getCartAPI() {
 
    const headers = await getAuthHeaders();
    return apiClient.get('/cart', headers);

}

export async function removeFromCartAPI(id) {

    const headers = await getAuthHeaders();
    console.log(headers)
    return apiClient.patch(`/cart/remove/${id}`, {}, headers);
 
}

export async function increaseProductAPI(id) {

    const headers = await getAuthHeaders();
    return apiClient.patch(`/cart/increase/${id}`, {}, headers);
 
}

export async function decreaseProductAPI(id) {

    const headers = await getAuthHeaders();
    return apiClient.patch(`/cart/decrease/${id}`, {}, headers);
 
}
export async function checkoutAPI(){
 
    const headers = await getAuthHeaders();
    return apiClient.post("/order/checkout", {}, headers)
 

}


export async function fetchOrders() {
  try {
  
    const token = await AsyncStorage.getItem('token');
    
    
    const reqOptions = {
      url: 'https://ecom-backend-8e91.onrender.com/api/order',
      method: 'GET',
      headers: {
        'x-auth-token': token,
       
      },
    };

    
    const response = await axios.request(reqOptions);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    throw error;
  }
}