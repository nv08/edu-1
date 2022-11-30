import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { HOST } from "../constants";

const ChatRoom = (props) => {
  const { sendMessage, currentUserId, socket } = props;

  const [msg, setMsg] = useState("");
  const [chatroomData, setChatroomData] = useState([]);
  const MsgChangeHandler = (e) => {
    setMsg(e);
  };

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      const text = [];
      fetch(`${HOST}/api/message/${currentUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then((res) => res.json())
        .then((res) => setChatroomData([...res.map((c) => c.text)])); //extract messages from here and set in chatroomdata);
    });
  }, []);

  useEffect(() => {
    socket.on("recieve-message", (payload) => {
      const { data } = payload;
      setChatroomData([...chatroomData, data]);
    });
  }, [chatroomData]);

  const Receiver = ({msg}) => {
    return (
      <View style={styles.messageRecieverBox}>
        <Text>{msg}</Text>
      </View>
    );
  };

  const Sender = ({msg}) => {
    return (
      <View style={styles.messageSenderBox}>
        <Text>{msg}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, borderWidth: 1, borderColor: "green" }}>
      <ScrollView style={{ borderWidth: 1, borderColor: "red", marginTop: 80 }}>
        <View>
          <Receiver msg="hello"/>
          <Sender msg="hi" />
          <Sender msg="how r u?" />
          <Receiver msg="I am good"/>
          <Sender msg="Send me an assignment" />
          <Receiver msg="Ok"/>
          {/* {chatroomData.map((chat) => {
            console.log(chat, "vvvvv");
            return <Text>{chat}</Text>;
          })} */}
        </View>
      </ScrollView>

      <View style={styles.textBoxArea}>
        <View
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "green",
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              height: 40,
              width: "100%",
              backgroundColor: "white",
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={msg}
            id="name"
            onChangeText={MsgChangeHandler}
            placeholder="Write your message"
          />
          <TouchableOpacity onPress={() => sendMessage(msg)}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBoxArea: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  messageRecieverBox: {
    paddingHorizontal: 10,
    alignItems:'flex-start',
    paddingVertical: 4,
    marginHorizontal: 10,
    maxWidth: "80%",
    width: "max-content",
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  messageSenderBox: {
    paddingHorizontal: 10,
    alignSelf:'flex-end',
    paddingVertical: 4,
    marginHorizontal: 10,
    maxWidth: "80%",
    width: "max-content",
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default ChatRoom;
