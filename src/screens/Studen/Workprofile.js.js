import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    ScrollView,
    BackHandler,
    RefreshControl,
  } from "react-native";
  
  
  import { Ionicons } from "@expo/vector-icons";
  import profileContext from "../../../component/context/profileContext";
  import React, { useState, useContext, useEffect, useCallback } from "react";
 
  import { AntDesign } from "@expo/vector-icons";
 import Menu from "../../components/Menu";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import UserForm from "../../components/UserForm";
  
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { FontAwesome } from "@expo/vector-icons";
  import { FontAwesome5 } from "@expo/vector-icons";
  
  //import axios from "axios";
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  
  const WorkProfile = ({ navigation }) => {
    const host = "http://192.168.43.185:5000";
    const { profiles, userProfile } = useContext(profileContext);
    const [refreshing, setRefreshing] = useState(false);
  
    useEffect(() => {
      userProfile();
      //console.log(userProfile)
    }, []);
  
    const onRefresh = useCallback(() => {
      setRefreshing(true);
  
      wait(2000).then(() => setRefreshing(false));
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={userProfile} />
          }
        >
          <View>
            {!profiles[0] ? <UserForm /> : null}
            {profiles?.map((item) => {
              return (
              <View key={item._id}>
                <UserForm>
                 
  
                  <View>
                    <View style={{ marginTop: 10 }}>
                      
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 20,
                          
                          color: "black",
                        }}
                      >
                        {item.cname}
                      </Text>
                    </View>
  
                    <View style={styles.Boxe}>
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
                        <MaterialCommunityIcons
                          name="email-edit-outline"
                          size={24}
                          color="green"
                        />
                        <Text style={styles.ISle}>{item.email}</Text>
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
                        <FontAwesome name="phone" size={24} color="green" />
                        <Text style={styles.ISle}>{item.phone}</Text>
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
                        <Text style={styles.ISle}>{item.city}</Text>
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
                        <Text style={styles.ISle}>{item.rollno}</Text>
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
                        <Text style={styles.ISle}>{item.address} </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                      }}
                    />
                    <View style={styles.Dist}>
                      <Text style={styles.ItSle}>Skills</Text>
                      <Text style={styles.ISle}>{item.skills}</Text>
  
                      <Text style={styles.ItSle}>Description</Text>
                      <Text style={styles.ISle}>{item.description}</Text>
                    </View>
                  </View>
                </UserForm>
              </View>
              );
            })}
          </View>
        </ScrollView>
        <View>
          <Menu />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    //modal styles
  
    textSte: {
      textAlign: "right",
      padding: 10,
      marginTop: 60,
    },
  
    Boxe: {
      paddingHorizontal: 5,
  
      margin: 5,
      marginTop: 30,
      paddingVertical: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
      margin: 20,
  
      borderRadius: 5,
  
      shadowColor: "green",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.35,
      shadowRadius: 4,
      elevation: 5,
    },
  
    Dist: {
      marginTop: 15,
      paddingHorizontal: 10,
    },
  
    ItSle: {
      color: "green",
      fontSize: 17,
      paddingVertical: 5,
      fontWeight: "bold",
      
    },
    ISle: {
      color: "grey",
      fontSize: 17,
      paddingVertical: 5,
     
    },
  });
  
  export default WorkProfile;
  