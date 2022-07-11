import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CMenu = () => {

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
      <View style={styles.MenuD1}>
        
        <TouchableOpacity onPress={() => navigation.navigate("Find Talent")}>
        <MaterialIcons name="home" size={42} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" size={34} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  MenuD1: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    height: 50,
    borderRadius: 100,
  },
});

export default CMenu;
