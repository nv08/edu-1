import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";



const Menu = () => {
  const navigation = useNavigation();
  const signOut = async () =>{
    await AsyncStorage.removeItem("token");
    Alert.alert("Success!", "Logout! Successfully.", [
      {
        text: "Ok",
        onPress: () => null,
        style: "cancel",
      },
    ]);
    navigation.navigate("Get Start")
    console.log(signOut)
    }


  return (
    <View>
      <View style={styles.MenuD}>
        <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
        <FontAwesome5 name="user-circle" size={34} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Inbox')}>
        <MaterialIcons name="forum" size={34} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut}>
        <MaterialIcons name="logout" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MenuD: {
   
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    height: 50,
    borderRadius: 100,

  },
  
});

export default Menu;
