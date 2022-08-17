import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Chat from "../components/Chat";


const GetStart = ({ navigation }) => {
  

  return (
    <LinearGradient
      colors={["#E0ACBC", "#F1D9E0", "transparent"]}
      style={styles.container}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 0, y: 0.9 }}
    >
      <SafeAreaView>
        <ScrollView>
        
          <View style={styles.flx}>
            
           
            <View style={styles.cenbtn}>
             
              <TouchableOpacity style={{backgroundColor: "green",borderRadius:20, height:40, justifyContent: "center", }} onPress={() => navigation.navigate("Hire Login")} >
              <Text style={{textAlign: 'center', color: "white",}}>FIND Student</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cenbtn}>
              
              <TouchableOpacity style={{backgroundColor: "green",borderRadius:20, height:40,  justifyContent: "center"}} onPress={() => navigation.navigate("Login")} >
              <Text style={{textAlign: 'center', color: "white", }}>Student Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
          <Chat />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  LogChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  LoImg: {
    height: 88,
    width: 82,
    marginTop: 110,
  },

  control: {
    textAlign: "center",
    paddingVertical: 5,
    color: "#008000",
    fontSize: 24,
    marginTop: 15,
   
  },
  getimg: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 30,
    paddingVertical: 10,
  },
  centimg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  click: {
    textAlign: "center",
    color: "#FF0099",
    fontSize: 15,
   
  },
  create: {
    textAlign: "center",
    color: "grey",
    fontSize: 20,
    paddingHorizontal: 50,
    paddingVertical: 5,
    
  },

  cenbtn: {
    paddingVertical: 5,
    paddingHorizontal: 50,
   
  },
  flx:{
    marginTop: 150,
  },
  btnrad: {
    borderRadius: 90,
    fontSize: 20,
  },
});

export default GetStart;
