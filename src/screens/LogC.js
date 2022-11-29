import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, { useState } from "react";
  import SubmitBu from "../components/SubmitBu";
import { HOST } from "../constants";
  
  
  
  const LogC = ({ navigation }) => {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
   
  
    const HandleSubmit = async () => {
      setLoading(true);
      const response = await fetch(`${HOST}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, password }),
      }); 
     
      const json = await response.json();
  
      console.log(json);
      if (json.success) {
        await AsyncStorage.setItem("token", json.authtoken);
        await AsyncStorage.setItem("userId", json.data.user.id);
        Alert.alert("Success!", "Sign in successfully. Welcome!", [
          {
            text: "Ok",
            onPress: () => null,
            style: "cancel",
          },
        ]);
        navigation.navigate("Find Talent");
      } else if (!Email || !password) {
        setLoading(false);
        Alert.alert("Error!", "Please fill in all fields", [
          {
            text: "Ok",
            onPress: () => null,
            style: "cancel",
          },
        ]);
      } else {
        setLoading(false);
        Alert.alert("Error!", "Invalid email or password", [
          {
            text: "Ok",
            onPress: () => null,
            style: "cancel",
          },
        ]);
      }
    };
  
    return (
     
        <View>
          <ScrollView>
            <View style={styles.LogmainS}>
              <View style={styles.LogChild}>
               
              </View>
              <View style={styles.LoGirl}>
               
              </View>
              <View style={styles.LoIn}>
              <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Email*</Text>
                <TextInput
                  style={styles.InputL}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={Email}
                  placeholder="Enter Your Email Address"
                  onChangeText={(actualdata) => setEmail(actualdata)}
                />
              </View>
              <View style={styles.LogIn1}>
              <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Password*</Text>
                <TextInput
                  style={styles.InputL1}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  placeholder="Enter Your Password"
                  onChangeText={(actualdata) => setPassword(actualdata)}
                />
              </View>
  
             <SubmitBu
              title="SIGN IN"
              HandleSubmit={HandleSubmit}
              loading={loading}
              />
              <View>
                <TouchableOpacity>
                  <Text style={styles.LogAc}>
                    Don't Have An Account?
                    <Text
                      onPress={() => navigation.navigate("Hire Signup")}
                      style={styles.LogSuP}
                    >
                      Sign Up
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
     
    );
  };
  
  const styles = StyleSheet.create({
    LogChild: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    LogmainS:{
      marginTop: 150,
    },
  
    LoImg: {
      height: 88,
      width: 82,
      marginTop: 90,
    },
    LoGirl: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    LoIcon: {
      height: 180,
      width: 190,
      marginTop: 25,
      paddingVertical: 10,
      resizeMode: "contain",
    },
    LoIn: {
      paddingHorizontal: 10,
    },
    InputL: {
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
      height: 40,
    },
    LogIn1: {
      paddingHorizontal: 10,
    },
    InputL1: {
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
      height: 40,
    },
    LogFor: {
      textAlign: "center",
      color: "#FF0099",
      fontSize: 14,
      paddingVertical: 2,
      
    },
    Logbt: {
      paddingHorizontal: 50,
      paddingVertical: 15,
    },
    LogAc: {
      color: "black",
      textAlign: "center",
      fontSize: 15,
      paddingVertical: 10,
      
    },
    LogSuP: {
      color: "black",
      textAlign: "center",
      margin: 5,
      fontWeight: "bold",
     
    },
  });
  export default LogC;
  