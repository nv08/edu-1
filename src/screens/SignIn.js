import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
  } from "react-native";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, { useState, useContext, useEffect } from "react";
  
  import SubmitBu from "../components/SubmitBu";
import { HOST } from "../constants";
  
  const SignIn = ({ navigation }) => {
    const { id } = useState(id);
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
   
  
    const HandleSubmit = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${HOST}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Email, password }),
          }
        );
        if (!Email || !password) {
          setLoading(false);
        }
  
        const json = await response.json();
  
        console.log(json);
  
        if (json.success) {
          await AsyncStorage.setItem("token", json.authtoken);
          await AsyncStorage.setItem("userId", json.data.user.id);
          await AsyncStorage.setItem("name", json.data.user.name);
         
          navigation.navigate("Profile");
          Alert.alert("Success!", "Sign in successfully. Welcome!", [
            {
              text: "Ok",
              onPress: () => null,
              style: "cancel",
            },
          ]);
        } else if (!Email || !password) {
          setLoading(false);
          Alert.alert("Error!", "Please enter your email and password!", [
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
      } catch (error) {
        console.error(error.message);
      }
    };
  
    return (
  
        <ScrollView>
          <View style={styles.mainS}>
  
            <View style={styles.Inpt3}>
              <Text
                style={{
                  fontSize: 14,
                 
                  marginTop: 5,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                Email*
              </Text>
              <TextInput
                style={styles.Inpt1}
                autoCapitalize="none"
                autoCorrect={false}
                value={Email}
                placeholder="Enter Your Email Address"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inpT4}>
              <Text
                style={{
                  fontSize: 14,
                  
                  marginTop: 5,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                Password*
              </Text>
              <TextInput
                style={styles.inpT2}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                placeholder="Enter Your Password"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
  
            <SubmitBu
              title="SIGN IN"
              HandleSubmit={HandleSubmit}
              loading={loading}
            />
            <View>
              <TouchableOpacity>
                <Text style={styles.txtS1}>
                  Don't Have An Account?
                  <Text
                    onPress={() => navigation.navigate("Sign Up")}
                    style={styles.txtS2}
                  >
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
     
    );
  };
  
  const styles = StyleSheet.create({
    sChild: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    mainS:{
      marginTop: 150,
    },
  
    sImg: {
      height: 88,
      width: 82,
      marginTop: 90,
    },
    sGirl: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
    },
    sIcon: {
      height: 180,
      width: 190,
  marginTop: 25,
      paddingVertical: 10,
      resizeMode: "contain",
    },
    Inpt1: {
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
  
      height: 40,
    },
    inpT2: {
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
  
      height: 40,
    },
    Inpt3: {
      paddingHorizontal: 10,
    },
    inpT4: {
      paddingHorizontal: 10,
    },
    txtS: {
      textAlign: "center",
      color: "#FF0099",
      fontSize: 14,
      paddingVertical: 2,
      
    },
  
    txtS1: {
      color: "black",
      textAlign: "center",
      fontSize: 15,
      paddingVertical: 10,
      
    },
    txtS2: {
      color: "black",
      textAlign: "center",
      margin: 5,
      fontWeight: "bold",
     
    },
    modalView: {
      backgroundColor: "white",
      margin: 20,
  
      borderRadius: 20,
  
      padding: 35,
  
      shadowColor: "green",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 4,
      elevation: 5,
    },
  });
  
  export default SignIn;
  