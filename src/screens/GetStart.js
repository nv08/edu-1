import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";


const GetStart = ({ navigation }) => {
  return (
  
      <SafeAreaView>
        <ScrollView>
          <View style={styles.flx}>
            <View style={styles.cenbtn}>
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                 
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Hire Login")}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Teacher 
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cenbtn}>
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                 
                  height: 40,
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Student Form
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    
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
  flx: {
    marginTop: 150,
  },
  btnrad: {
    borderRadius: 90,
    fontSize: 20,
  },
});

export default GetStart;
