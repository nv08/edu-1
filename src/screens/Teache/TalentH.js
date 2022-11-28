import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import CMenu from "../../components/CMenu";
import io from "socket.io-client";

const TalentH = () => {
  const [profiles, setProfiles] = useState([]);

  const [skillsTerm, setSkills] = useState("");
  const [rollnoTerm, setRollno] = useState("");
  const [cityTerm, setCity] = useState("");

  const filterData = () => {
    AsyncStorage.getItem("token").then((token) => {
      fetch(`https://eduback.onrender.com/api/profile/fetchallprofiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          skills: skillsTerm,
          rollno: rollnoTerm,
          city: cityTerm,
        }),
      })
        .then((res) => res.json())
        .then((res) => setProfiles(res));
    });

    // const responseJson = await response.json();
    // console.log(responseJson);
    // setProfiles(responseJson);
  };
  // if (skillsTerm === "" && rollnoTerm === "" && cityTerm === "") {
  //   filterData();
  // }

  //  useEffect(() => {
  //   getProfile();
  // }, []);

  const sock = io("https://eduback.onrender.com");
  // const sendMsg = useCallback(() => {
  //   console.log(profiles, "ppppp");
  //   sock.emit('send-message', { receiverId: profiles.length > 0 ? profiles[0].user : '', data: 'Hello' })
  // }, [profiles])

  useEffect(() => {
    if (profiles.length === 0) {
      filterData();
    } else {
      console.log("heeere");
      // AsyncStorage.getItem('userId').then((d)=>{

      // })
      sock.connect();
      sock.emit("send-message", {
        receiverId: profiles[0].user,
        data: "Hello",
      });
    }

    // fetchLastMessages();

    // sendMsg();
  }, [profiles]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      {/* <ScrollView> */}
      <View style={styles.Tcolor}>
        <View style={styles.TalentP}>
          <TextInput
            style={styles.TalUp}
            autoCapitalize="none"
            autoCorrect={false}
            value={skillsTerm}
            placeholder="Type Subject..."
            onChangeText={(actualdata) => {
              setSkills(actualdata);
              filterData();
            }}
          />
        </View>
        <View style={styles.TalentP}>
          <TextInput
            style={styles.TalUp}
            autoCapitalize="none"
            autoCorrect={false}
            value={cityTerm}
            placeholder="Type City..."
            onChangeText={(actualdata) => {
              setCity(actualdata);
              filterData();
            }}
          />
        </View>
        <View style={styles.TalentP}>
          <TextInput
            style={styles.TalUp}
            autoCapitalize="none"
            autoCorrect={false}
            value={rollnoTerm}
            placeholder="Type roll no.."
            onChangeText={(actualdata) => {
              setRollno(actualdata);
              filterData();
            }}
          />
        </View>
      </View>
      {profiles.length > 0 ? (
        <FlatList
          data={profiles}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item._id}>
              <View style={styles.boxes}>
                <View>
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
                    <Text>Email</Text>
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
                    <Text>City</Text>
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
                    <Text>Roll No.</Text>
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
                    <Text>Address</Text>
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
                    <Text style={styles.textStyle0}>Subjects</Text>
                    <Text style={styles.textStyle}>{item.skills}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          onEndReachedThreshold={0.01}
        />
      ) : (
        <Text
          style={{
            color: "black",
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          No Results Found...
        </Text>
      )}
      {/* </ScrollView> */}
      <View>
        <CMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxes: {},

  CliImg: {
    width: 50,
    height: 50,
  },
  Tcolor: {
    paddingVertical: 30,
  },
  textStyle: {
    color: "grey",

    fontSize: 15,
  },
  rowView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textStyle0: {
    fontSize: 17,
    color: "black",
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
