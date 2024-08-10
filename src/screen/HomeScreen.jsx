import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import useData from "../hooks/useData";
import Pagination from "../components/Pagination";
import UserContext from "../context/UserContext";
import { logout } from "../services/userServices";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState();
  const [category, setCategory] = useState("");
  const navigation = useNavigation();
  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  const { data, isLoading, error } = useData("/products", {
    params: {
      category,
      page
    },
  }, [category,page]);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
    
  }, [data]);
 const handeleOnPress=(pageNo)=>{
      setPage(pageNo)
 }


  return (
    <LinearGradient colors={["#EAE9EE", "#EAE9EE"]} style={styles.container}>
      {renderHeader()}
      <Tags onTagPress={(tagValue) => setCategory(tagValue)} />


  



      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#E96E6E" />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>Error fetching data</Text>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
         // ListHeaderComponent={renderHeader}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              handleProductClick={handleProductDetails}
            />
          )}
          keyExtractor={(item, index) =>item?._id }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ data && <Pagination totalPosts={data.totalProducts} postsPerPage={8} currentPage={page} onPress={handeleOnPress}/>}
        />
      )}

     
    </LinearGradient>
  );
};

export default HomeScreen;


const renderHeader = () => {
  const navigation= useNavigation()
  const handlelogout=()=>{
     try {
      logout()
    navigation.replace("LOGIN")
     BackHandler.exitApp()

     } catch (error) {
      
     } 
  }
  return(
  <View>
    <Header  onPress={handlelogout}/>
    <Text style={styles.headingText}>Match Your Style</Text>
    <View style={styles.inputContainer}>
      
      <Image 
        source={require("../assets/search.png")}
        style={styles.searchIcon}
      />
      
      <TextInput placeholder="Search" style={styles.textInput} />
    </View>
  
  </View>
)};



const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1, // Ensure the container takes full height
  },
  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});
