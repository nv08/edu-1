import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import chatroomContext from "../../component/context/chatroomContext";
import { Badge } from "react-native-paper";

const CMenu = () => {
  const { unreadMessage, setUnreadMessage, clearData } = useContext(chatroomContext);

  const navigation = useNavigation();
  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    Alert.alert("Success!", "Logout! Successfully.", [
      {
        text: "Ok",
        onPress: () => null,
        style: "cancel",
      },
    ]);
    clearData();
    navigation.navigate("Get Start");
  };

  return (
    <View>
      <View style={styles.MenuD1}>
        <TouchableOpacity onPress={() => navigation.navigate("Find Talent")}>
          <MaterialIcons name="home" size={42} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Inbox");
            setUnreadMessage(0);
          }}
          style={{ position: "relative" }}
        >
         <Badge style={{position: 'absolute', zIndex: 1, right: -10, top: -10}} children={unreadMessage} visible={Boolean(unreadMessage)} />

          <MaterialIcons name="forum" size={42} color="white" />
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
    backgroundColor: "black",
    height: 50,
    borderRadius: 100,
  },
});

export default CMenu;
