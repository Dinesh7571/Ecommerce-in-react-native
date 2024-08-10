import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import useData from "../hooks/useData";
import config from '../config.json'
const Tags = ({onTagPress}) => {
 const [selected,setSelected]=useState("")
  const {data,isLoading,error}=useData("/category")

  
const handleOnPress=(item) =>{
  setSelected(item);
  onTagPress(item.name)
  //console.log("selected:"+selected.name)
} 
 

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
       
        renderItem={({ item }) => {
          return (
            <TouchableOpacity key={item._id}  onPress={()=>handleOnPress(item)}  >
              <View  style={[styles.categoryContainer, item == selected ? styles.isSelected : null,]}>
              <Image style={styles.icon} source={{uri:`${config.backendURL}/category/${item.image}`}}/>
              <Text
                style={[
                  styles.tagText,
                  item== selected ? styles.isSelected : null
               ] }
              >
                {item.name}
              </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  categoryContainer:{
   justifyContent:'space-around',
    flexDirection:'row',
    backgroundColor:'#fff',
    paddingHorizontal:8,
    margin:5,
    borderRadius:8,
   alignItems:'center'
    
  },
  icon:{
      height:35,
      width:35,
      
  },
  tagText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    
    color: "#444444",
    fontWeight: "700",
  },
  isSelected: {
    backgroundColor: "#E96E6E",
    color: "#FFFFFF",
  },
  container: {
    marginVertical: 10,
  },
});
