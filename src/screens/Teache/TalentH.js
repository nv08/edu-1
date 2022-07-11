import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    Alert,
    Button,
  } from "react-native";
  // import AsyncStorage from "@react-native-async-storage/async-storage";
  import React, { useState, useContext, useEffect } from "react";
  import profileContext from "../../../component/context/profileContext";
  import { Ionicons } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import { FontAwesome5 } from "@expo/vector-icons";
  import CMenu from "../../components/CMenu";
  

  import SubmitBu from "../../components/SubmitBu";
  
  const TalentH = ({ navigation, route }) => {
    const { profiles, getProfile } = useContext(profileContext);

    const [skillsTerm, setSkills] = useState("");
    const [rollnoTerm, setRollno] = useState("");
    const [cityTerm, setCity] = useState("");
   
  
    useEffect(() => {
      getProfile();
    }, []);
  
    useEffect(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to close the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  
   
  
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <ScrollView>
          <View style={styles.Tcolor}>
            <View style={styles.TalentP}>
              <TextInput
                style={styles.TalUp}
                autoCapitalize="none"
                autoCorrect={false}
                value={skillsTerm}
                placeholder="Type Skill..."
                onChangeText={(actualdata) => setSkills(actualdata)}
              />
            </View>
            <View style={styles.TalentP}>
              <TextInput
                style={styles.TalUp}
                autoCapitalize="none"
                autoCorrect={false}
                value={cityTerm}
                placeholder="Type City..."
                onChangeText={(actualdata) => setCity(actualdata)}
              />
            </View>
            <View style={styles.TalentP}>
              <TextInput
                style={styles.TalUp}
                autoCapitalize="none"
                autoCorrect={false}
                value={rollnoTerm}
                placeholder="Type Postal..."
                onChangeText={(actualdata) => setRollno(actualdata)}
              />
            </View>
          </View>
  
          {profiles.map((item) => {
              return (
                <View key={item._id}>
                  <View style={styles.boxes}>
                    <TouchableOpacity
                     
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          
                          color: "black",
                        }}
                      >
                        {item.cname}
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingHorizontal: 5,
                          paddingVertical: 3,
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome name="flag-o" size={24} color="green" />
                        <Text style={styles.textStyle}>{item.email} </Text>
                      </View>
                     
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingHorizontal: 5,
                          paddingVertical: 3,
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome name="flag-o" size={24} color="green" />
                        <Text style={styles.textStyle}>{item.city} </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingHorizontal: 5,
                          paddingVertical: 3,
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome5
                          name="address-book"
                          size={24}
                          color="green"
                        />
                        <Text style={styles.textStyle}>{item.rollno}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingHorizontal: 5,
                          paddingVertical: 3,
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="md-location-sharp"
                          size={24}
                          color="green"
                        />
                        <Text style={styles.textStyle}>{item.address}</Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          paddingHorizontal: 5,
                          paddingVertical: 3,
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.textStyle0}>Skills</Text>
                        <Text style={styles.textStyle}>{item.skills}</Text>
                      </View>
  
                      <View>
                        <Text style={styles.CSen}>View Profile</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </ScrollView>
        <View>
          <CMenu />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    boxes: {
      borderWidth: 1,
      margin: 5,
      borderColor: "green",
      paddingVertical: 10,
      paddingHorizontal: 10,
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
  
    CliImg: {
      width: 50,
      height: 50,
    },
    Tcolor: {
      backgroundColor: "#E0ACBC",
      paddingVertical: 30,
    },
    textStyle: {
      color: "grey",
      
      fontSize: 15,
    },
    textStyle0: {
      
      fontSize: 17,
      color: "green",
      fontWeight: "bold",
      paddingVertical: 5,
    },
    CSen: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
      marginTop: 12,
      color: "green",
      
    },
  
    TalentP: {
      paddingHorizontal: 10,
    },
    TalUp: {
      borderWidth: 1,
      borderColor: "green",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginTop: 20,
      height: 40,
      backgroundColor: "white",
    },
  });
  export default TalentH;
  