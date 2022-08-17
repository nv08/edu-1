import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import SubmitBu from "../components/SubmitBu";

const SignUp = ({ navigation }) => {
  const [cname, setcName] = useState("");
  const [Email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 

  const HandleSubmit = async () => {
    setLoading(true);
    const response = await fetch(
      `http://172.198.403.105:5000/api/auth/newuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cname, Email, rollno, password }),
      }
    );
    if (!cname || !Email || !rollno || !password) {
      setLoading(false);
    }
    const json = await response.json();

    console.log(json);
    if (json.success) {
      Alert.alert("Success!", "Sign up successfully. Welcome!", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      navigation.navigate("Login");
    } else if (!cname || !Email || !rollno || !password) {
      Alert.alert("Error", "Please fill in all fields", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } else if (cname.length < 3) {
      setLoading(false);
      Alert.alert("Error!", "Name must be atleast 3 characters", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } else if (Email.includes("@") === false) {
      setLoading(false);
      Alert.alert("Error!", "Please enter a valid email", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } else if (rollno.length < 5) {
      setLoading(false);
      Alert.alert("Error!", "Please enter a valid phone number", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } else if (password.length < 5) {
      setLoading(false);
      Alert.alert("Error!", "Password must be atleast 5 characters", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
    } else {
      setLoading(false);
      Alert.alert("Error!", json.error, [
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
      <ScrollView>
        <View style={styles.UpTop}>
        

          <View style={styles.InUpT}>
            <Text
              style={{
                fontSize: 14,
                
                marginTop: 5,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Name*
            </Text>
            <TextInput
              style={styles.InptUp1}
              autoCapitalize="none"
              autoCorrect={false}
              value={cname}
              placeholder="Enter Your Name"
              onChangeText={(actualdata) => setcName(actualdata)}
            />
          </View>

          <View style={styles.InUpT}>
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
              style={styles.InptUP2}
              autoCapitalize="none"
              autoCorrect={false}
              value={Email}
              placeholder="Enter Your Email Address"
              onChangeText={(actualdata) => setEmail(actualdata)}
            />
          </View>

          <View style={styles.InUpT}>
            <Text
              style={{
                fontSize: 14,
               
                marginTop: 5,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Phone*
            </Text>
            <TextInput
              style={styles.InptUp3}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={rollno}
              placeholder="Enter Your rollno"
              onChangeText={(actualdata) => setRollno(actualdata)}
            />
          </View>

          <View style={styles.InUpT}>
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
              style={styles.InptUp4}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              placeholder="Enter Your Password"
              onChangeText={(actualdata) => setPassword(actualdata)}
            />
          </View>
          <View>
            <SubmitBu
              HandleSubmit={HandleSubmit}
              title="SIGN UP"
              loading={loading}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.txtS4}>
              Already Have An Account?
              <Text style={styles.txtS3}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  UpImg: {
    width: 75,
    height: 88,
    marginTop: 90,
  },
  UpTop:{
    marginTop: 150,
  },
  wrkcen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sIcon: {
    width: 190,
    height: 180,
    marginTop: 25,
    paddingVertical: 10,
    resizeMode: "contain",
  },
  Upcen: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  InptUp1: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",

    height: 40,
  },
  InptUP2: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",

    height: 40,
  },
  InptUp3: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    height: 40,
  },
  InptUp4: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    height: 40,
  },
  InUpT: {
    paddingHorizontal: 10,
   
  },
  btnSign: {
    borderRadius: 90,
    fontSize: 20,
  },
  btnspc: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  TxtS2: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF0099",
    marginVertical: 10,
    backgroundColor: "green",
  },
  txtS4: {
    color: "#008000",
    textAlign: "center",
    fontSize: 14,
    paddingBottom: 15,
    
  },
  txtS3: {
    color: "#FF0099",
    textAlign: "center",
    margin: 5,
    fontWeight: "bold",
    
  },
});

export default SignUp;
