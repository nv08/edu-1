import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import CMenu from "../../components/CMenu";
import { HOST } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import SingleForm from "./SingleForm";
import profileContext from "../../../component/context/profileContext";
import ChatroomState from "../../../component/context/chatroomState";

const TalentH = () => {
  const [profiles, setProfiles] = useState();
  const navigation = useNavigation();
  const [skillsTerm, setSkills] = useState("");
  const [rollnoTerm, setRollno] = useState("");
  const [cityTerm, setCity] = useState("");
  const [nearbyProfiles, setNearbyProfiles] = useState([]);
  const { location } = useContext(profileContext);
  const [filterExist, setFilterExist] = useState(false);

  const filterData = () => {
    AsyncStorage.getItem("token").then((token) => {
      fetch(`${HOST}/api/profile/fetchallprofiles`, {
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
  };

  const fetchNearbyProfiles = () => {
    if (location)
      AsyncStorage.getItem("token").then((token) => {
        fetch(`${HOST}/api/profile/getNearbyProfiles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            longitude: location[0],
            latitude: location[1],
          }),
        })
          .then((res) => res.json())
          .then((res) => setNearbyProfiles(res));
      });
  };

  // useEffect(() => {
  //   if (profiles.length > 0) {
  //     sock.emit("new-user-add", profiles[0].user);
  //   }
  // }, [profiles]);

  // useEffect(() => {
  //   sock.connect();
  //   const receiveMsg = () => {
  //     c
  //   };
  //   receiveMsg();
  //   return () => {
  //     sock.off("recieve-message");
  //   };
  // }, [sock]);

  useEffect(() => {
    fetchNearbyProfiles();
  }, [location]);

  useEffect(() => {
    // if someone is using filter then use /fetchAllProfiles api
    if (skillsTerm || rollnoTerm || cityTerm) {
      setFilterExist(true);
      filterData();
    } else {
      setFilterExist(false);
    }
  }, [skillsTerm, rollnoTerm, cityTerm]);

  const isChatExist = async (teacherId, stuId) => {
    const token = await AsyncStorage.getItem("token");
    const data = await fetch(`${HOST}/api/chat/find/${teacherId}/${stuId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const result = await data.json();
    if (result) return true;
    return false;
  };

  const handleChatNowHandler = async (item) => {
    const studentId = item.user;
    const studentName = item.cname;
    AsyncStorage.getItem("userId").then((teacherId) => {
      AsyncStorage.getItem("name").then(async (teacherName) => {
        // check if chat exist, if not then create chat
        const chatExist = await isChatExist(teacherId, studentId);
        if (!chatExist) {
          AsyncStorage.getItem("token").then((token) => {
            fetch(`${HOST}/api/chat/createchat`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
              },
              body: JSON.stringify({
                senderDetails: {
                  id: teacherId,
                  name: teacherName,
                },
                receiverDetails: {
                  id: studentId,
                  name: studentName,
                },
              }),
            });
          });
        }
        navigation.navigate("Inbox", { activeUserId: studentId });
      });
    });
  };

  // adding comment to a particular profile api
  const handleSubmitComment = (id, comment) => {
    if (!id || !comment) return;
    AsyncStorage.getItem("name").then(async (teacherName) => {
      AsyncStorage.getItem("token").then((token) => {
        fetch(`${HOST}/api/profile/addComment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            id: id,
            comment: comment,
            commentBy: teacherName,
          }),
        });
      });
    });
  };

  const renderNoResult = () => {
    return (
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
    );
  };

  return (
    <ChatroomState>
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
              }}
            />
          </View>
        </View>
        <FlatList
          removeClippedSubviews={false}
          data={filterExist ? profiles : nearbyProfiles}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item._id}>
              <SingleForm
                item={item}
                handleChatNowHandler={handleChatNowHandler}
                handleSubmitComment={handleSubmitComment}
              />
            </View>
          )}
          onEndReachedThreshold={0.01}
          ListEmptyComponent={renderNoResult}
        />
        {/* </ScrollView> */}
        <View>
          <CMenu />
        </View>
      </View>
    </ChatroomState>
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
