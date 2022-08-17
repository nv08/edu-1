import { StyleSheet, Text, View, Image, TextInput,  TouchableOpacity, ScrollView, Alert } from 'react-native'
import React,{useState} from 'react'
import { LinearGradient } from 'expo-linear-gradient';

import SubmitBu from '../components/SubmitBu';



const SignC = ({navigation}) => {
  const [cname, setcName] = useState("");
  const [Email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async() => { 
    setLoading(true); 
    const response = await fetch(`http://172.198.403.105:5000/api/auth/newuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cname, Email,rollno, password})
    });
    if(!cname || !Email || !rollno || !password){
      setLoading(false);
    }
    const json = await response.json()

    console.log(json)
    if (Email === json.Email) {
      console.log('Email already exists')
    }
    if (json.success){
      Alert.alert("Success!", "Sign up successfully. Welcome!", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
     navigation.navigate("Talent Login")
   
     
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
  } else if (Email.includes ("@") === false) {
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
    Alert.alert("Error!", "Please enter a valid roll number", [
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
  }

  return (
    <LinearGradient
    colors={['#E0ACBC', '#F1D9E0', 'transparent']}
    style={styles.container}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 0, y: 0.9 }}
  >
    <ScrollView>
      <View style={styles.CliT}>
       
       

        <View style={styles.CliePut}>
        <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Name*</Text>
          <TextInput
            style={styles.ClPut}
            autoCapitalize="none"
            autoCorrect={false}
            value={cname}
            placeholder="Enter Your Name"
            onChangeText={(actualdata) => setcName(actualdata)}
          />
        </View>

        <View style={styles.CliePut}>
        <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Email*</Text>
          <TextInput
            style={styles.ClPut}
            autoCapitalize="none"
            autoCorrect={false}
            value={Email}
            placeholder="Enter Your Email Address"
            onChangeText={(actualdata) => setEmail(actualdata)}
          />
        </View>

        <View style={styles.CliePut}>
        <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Phone*</Text>
          <TextInput
            style={styles.ClPut}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
            value={rollno}
            placeholder="Enter Your Phone"
            onChangeText={(actualdata) => setRollno(actualdata)}
          />
        </View>

        <View style={styles.CliePut}>
        <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Password*</Text>
          <TextInput
            style={styles.ClPut}
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
        title="SIGN UP"
        HandleSubmit={HandleSubmit}
        loading={loading}
       />
        </View>
        <TouchableOpacity>
            <Text style={styles.CsGn}>
             Already Have An Account?
              <Text
                onPress={() => navigation.navigate("Hire Login")}
                style={styles.CenL}
              >
                Login
              </Text>
            </Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
 
  CliT:{
    marginTop: 150,
  },
  Cchild:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ChiLogo:{
    width: 75,
    height: 88,
    marginTop: 90,
  },
  ClimG:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  CIcOn:{
    width: 190,
    height: 180,
    marginTop: 25,
    paddingVertical: 10,
    resizeMode: "contain",
  },
  CliePut:{
   
    paddingHorizontal: 10,
   
  },
  ClPut:{
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    height: 40,
  },
 
  CbtN:{
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  CsGn:{
    color: "#008000",
    textAlign: "center",
    fontSize: 14,
    paddingBottom: 15,
    
  },
  CenL:{
    color: "#FF0099",
    textAlign: "center",
    margin: 5,
    fontWeight: 'bold',
    
    
  }
})

export default SignC

