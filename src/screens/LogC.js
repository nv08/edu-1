import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    Image,
    TouchableOpacity,
    TextInput,
  } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, { useState } from "react";
  import { LinearGradient } from "expo-linear-gradient";
  import SubmitBu from "../components/SubmitBu";
  
  
  
  const LogC = ({ navigation }) => {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
   
  
    const HandleSubmit = async () => {
      setLoading(true);
      const response = await fetch(`http://172.198.403.105:5000/api/auth/login`, {
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
      <LinearGradient
        colors={["#E0ACBC", "#F1D9E0", "transparent"]}
        style={styles.container}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0, y: 0.9 }}
      >
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
      </LinearGradient>
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
      color: "#008000",
      textAlign: "center",
      fontSize: 15,
      paddingVertical: 10,
      
    },
    LogSuP: {
      color: "#FF0099",
      textAlign: "center",
      margin: 5,
      fontWeight: "bold",
     
    },
  });
  export default LogC;
  