import apiClient from "../utils/api-client";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
const tokenName="token"
import axios from "axios";

import { decode } from "base-64";
global.atob = decode


export async function signup(user, profile) {
    const body = new FormData();
    body.append("name", user.name);
    body.append("email", user.email);
    body.append("password", user.password);
    body.append("deliveryAddress", user.deliveryAddress);
    if (profile) {
        body.append("profilePic", {
            uri: profile.uri,
            type: 'image/jpeg',
            name: 'profilePic.jpg',
        });
    }

    
        const { data } = await apiClient.post("/user/signup", body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        await AsyncStorage.setItem(tokenName, data.token);
        console.log(data.token);
   
}

export async function login(user) {
  
      const { data } = await apiClient.post('/user/login', user);
      await AsyncStorage.setItem(tokenName, data.token);
     
   
  }

export function logout(){
    AsyncStorage.removeItem(tokenName)
}

export async function getUser(){
    const tokenString = await AsyncStorage.getItem(tokenName);
    console.log("toke:"+tokenString)

      if(tokenString!=null)  {
        
       const user = await jwtDecode(tokenString)
       return user        
      }else{
        console.log("no user")
        return null
        
      }
        
    
}

export async function getJwt() {
     return await AsyncStorage.getItem(tokenName);  
  }