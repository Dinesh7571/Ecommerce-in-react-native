import { View, Text, Image, StatusBar, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screen/HomeScreen";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import CartScreen from "./src/screen/CartScreen";
import ReorderScreen from "./src/screen/ReorderScreen";
import AccountScreen from "./src/screen/AccountScreen";
import LoginScreen from "./src/screen/LoginScreen";
import SignupScreen from "./src/screen/SignupScreen";
import { CartContext, CartProvider } from "./src/context/CartContext";
import { getJwt, getUser, logout } from "./src/services/userServices";
import setAuthToken from "./src/utils/setAuthToken";
import UserContext from "./src/context/UserContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const Tabs = () => {
    const { cart } = useContext(CartContext);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,

            }}
            initialRouteName="Home"
        >
            <Tab.Screen
                name="HOME"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    source={require("./src/assets/focused/home.png")}
                                    style={{
                                        height: size,
                                        width: size,
                                        resizeMode: "center",
                                    }}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    source={require("./src/assets/normal/home.png")}
                                    style={{
                                        height: size,
                                        width: size,
                                        resizeMode: "center",
                                    }}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="REORDER"
                component={ReorderScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    source={require("./src/assets/focused/reorder.png")}
                                    style={{
                                        height: size,
                                        width: size,
                                        resizeMode: "center",
                                    }}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    source={require("./src/assets/normal/reorder.png")}
                                    style={{
                                        height: size,
                                        width: size,
                                        resizeMode: "center",
                                    }}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="CART"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => {
                        if (focused) {
                            return (
                                <View style={{ position: "relative" }}>
                                    <Image
                                        source={require("./src/assets/focused/shopping_cart.png")}
                                        style={{
                                            height: size,
                                            width: size,
                                            resizeMode: "center",
                                        }}
                                    />
                                    <View
                                        style={{
                                            position: "absolute",
                                            right: -3,
                                            bottom: 22,
                                            height: 14,
                                            width: 14,
                                            backgroundColor: "#E96E6E",
                                            borderRadius: 7,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 10 }}>
                                            {cart.length}
                                        </Text>
                                    </View>
                                </View>
                            );
                        } else {
                            return (
                                <View style={{ position: "relative" }}>
                                    <Image
                                        source={require("./src/assets/normal/shopping_cart.png")}
                                        style={{
                                            height: size,
                                            width: size,
                                            resizeMode: "center",
                                        }}
                                    />
                                    <View
                                        style={{
                                            position: "absolute",
                                            right: -3,
                                            bottom: 22,
                                            height: 14,
                                            width: 14,
                                            backgroundColor: "#C0C0C0",
                                            borderRadius: 7,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 10 }}>
                                            {cart.length}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="ACCOUNT"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ focused, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    source={require("./src/assets/focused/account.png")}
                                    style={{
                                        height: size,
                                        width: size,
                                        resizeMode: "center",
                                    }}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    source={require("./src/assets/normal/account.png")}
                                    style={{
                                        height: size,
                                        width: size,
                                        resizeMode: "center",
                                    }}
                                />
                            );
                        }
                    },
                }}
            />
        </Tab.Navigator>
    );
};


const StackNavigator = () => {
    <Stack.Navigator initialRouteName="LOGIN" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        {/* <Stack.Screen name="SIGNUP" component={SignupScreen} /> */}
        {/* <Stack.Screen name="TABS" component={Tabs} /> */}
        {/* <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} /> */}
    </Stack.Navigator>
}



setAuthToken(getJwt());

const Navigator = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const jwtUser = await getUser();

                if (jwtUser && Date.now() >= jwtUser.exp * 1000) {
                    await AsyncStorage.removeItem("tokenName");
                } else {
                    console.log("user:" + jwtUser);
                    setUser(jwtUser);
                }
            } catch (error) {

            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);



    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAE9EE' }}>
                <StatusBar backgroundColor={'#EAE9EE'} barStyle="dark-content" />
                <ActivityIndicator size="large" color="#E96E6E" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={'#EAE9EE'} barStyle="dark-content" />
            <UserContext.Provider value={user}>
                <CartProvider>
                    {
                        user == null ?

                            <Stack.Navigator initialRouteName="LOGIN" screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="LOGIN" component={LoginScreen} />
                                <Stack.Screen name="SIGNUP" component={SignupScreen} />
                                <Stack.Screen name="TABS" component={Tabs} />
                                <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
                            </Stack.Navigator>

                            : 
                            
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                              <Stack.Screen name="TABS" component={Tabs} />
                              <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
                              <Stack.Screen name="LOGIN" component={LoginScreen} />
                              <Stack.Screen name="SIGNUP" component={SignupScreen} />
                             </Stack.Navigator>
                            
                           
                           }
                         
                   

                </CartProvider>
            </UserContext.Provider>
        </NavigationContainer>
    );
};






export default Navigator;
