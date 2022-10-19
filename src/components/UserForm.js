import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    BackHandler,
  } from "react-native";
  
  import React, { useState, useContext, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";
  import profileContext from "../../component/context/profileContext";
  
  import { LinearGradient } from "expo-linear-gradient";
  
  const UserForm = ({ children }) => {
    const navigation = useNavigation();
  
    const { addProfile, profiles } = useContext(profileContext);
  
    const [cname, setcName] = useState("");
    const [email, setEmail] = useState("");
   
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [rollno, setRollno] = useState("");
    const [address, setAddress] = useState("");
    const [skills, setSkills] = useState("");
    const [description, setDescription] = useState("");
   
    
  
    useEffect(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to close the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
    const Handleclick = () => {
      addProfile(cname, email,  phone, city, rollno, address, skills, description, );
      navigation.navigate("AccountW");
  
      Alert.alert("Congratulations!", "Profile published successfully. Welcome!", [
        {
          text: "Ok",
          onPress: () => null,
          style: "cancel",
        },
      ]);
      
    };
  
    return (
      <View>
        {children ? (
          children
        ) : (
          <View>
            <View>
              <Text style={styles.PubT}>Studnet Form</Text>
            </View>
  
            <View style={styles.marg}>
              <View style={styles.CliePut}>
              <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Name*</Text>
                <TextInput
  
                  style={styles.ClPut}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={15}
                  value={cname}
                  id="name"
                  onChangeText={(text) => setcName(text)}
                  placeholder="Write Your name (3 to 15 characters)"
                />
              </View>
  
              <View style={styles.CliePut}>
              <Text style={{fontSize: 14, marginTop: 5, fontWeight: "bold",color:"grey"}}>Email*</Text>
                <TextInput
                  style={styles.ClPut}
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={25}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Write Your email (8 to 25 characters)"
                  id="email"
                />
              </View>
            
              <View style={styles.CliePut}>
              <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Phone*</Text>
                <TextInput
                  style={styles.ClPut}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  value={phone}
                 
                  onChangeText={(text) => setPhone(text)}
                  placeholder="Write Your phone (e.g 080XXXXXXXXX)"
                  id="phone"
                />
              </View>
              <View style={styles.CliePut}>
              <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>City*</Text>
              <TextInput
                style={styles.ClPut}
                autoCapitalize="none"
                autoCorrect={false}
                value={city}
                onChangeText={(text) => setCity(text)}
                
                placeholder="Write Your city"
              />
            </View>
        
              <View style={styles.CliePut}>
              <Text style={{fontSize: 14, marginTop: 5, fontWeight: "bold",color:"grey"}}>Roll no*</Text>
                <TextInput
                  style={styles.ClPut}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={rollno}
                  maxLength={10}
                  onChangeText={(text) => setRollno(text)}
                  placeholder="Write Your Roll no (e.g 123456789)"
                />
              </View>
              <View style={styles.CliePut}>
              <Text style={{fontSize: 14, marginTop: 5, fontWeight: "bold",color:"grey"}}>Address*</Text>
              <TextInput
                style={styles.ClPut}
                autoCapitalize="none"
                autoCorrect={false}
                value={address}
               
                onChangeText={(text) => setAddress(text)}
                placeholder="Write Your Address (e.g House No. 123, Street Name)"
                id="address"
              />
            </View>
            <View style={styles.CliePut}>
            <Text style={{fontSize: 14,  marginTop: 5, fontWeight: "bold",color:"grey"}}>Subjects*</Text>
            <TextInput
              style={styles.Skilt}
              autoCapitalize="none"
              autoCorrect={false}
              value={skills}
              multiline
              numberOfLines={3}
              onChangeText={(text) => setSkills(text)}
              maxLength={80}
              placeholder="Write Your Subject"
              id="skills"
            />
          </View>
              <View style={styles.CliePut}>
              <Text style={{fontSize: 14, marginTop: 5, fontWeight: "bold",color:"grey"}}>Description*</Text>
                <TextInput
                  style={styles.ClPutt}
                  multiline
                  numberOfLines={4}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  placeholder="Write About Yourself (e.g i am student of computer science)"
                  maxLength={500}
                  id="description"
                />
              </View>
          
              <View style={{ paddingBottom: 20, paddingTop: 15 }}>
                <TouchableOpacity style={styles.Logbt} disabled={cname.length < 3 || email.length < 8 || email.includes("@") === false || phone.length < 6 || rollno.length < 1 || city.length < 2 || address.length < 5 || skills.length < 5 || description.length < 50 } onPress={Handleclick}>
                  <Text style={styles.Logbt1} >PUBLISH</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };
  const styles = StyleSheet.create({
    CliePut: {
      paddingHorizontal: 10,
    },
    marg: {
      marginTop: 5,
    },
    PubT: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "bold",
      color: "green",
      paddingVertical: 30,
      marginTop: 90,
    },
    ClPut: {
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      
      height: 40,
      backgroundColor: "white",
    },
    ClPutt: {
     
      borderWidth: 1,
      borderColor: "green",
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: "white",
    },
    Skilt: {
     
      borderWidth: 1,
      borderColor: "green",
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: "white",
    },
    Logbt: {
      backgroundColor: "black",
      marginHorizontal: 20,
      borderRadius: 20,
    },
  
    Logbt1: {
      color: "white",
      textAlign: "center",
      paddingVertical: 10,
      fontWeight: "bold",
    },
  });
  export default UserForm;