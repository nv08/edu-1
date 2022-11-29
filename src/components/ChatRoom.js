import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
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
    console.log(chatroomData, "cccc1");
    socket.on("recieve-message", (payload) => {
      const { data } = payload;
      setChatroomData([...chatroomData, data]);
      console.log(chatroomData, "cccc");
    });
  }, [chatroomData]);

  return (
    <View>
      <View>
        {chatroomData.map((chat) => (
          <Text>{chat}</Text>
        ))}
      </View>
      <TextInput
        style={{
          marginTop: 200,
          borderWidth: 1,
          borderColor: "green",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,

          height: 40,
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
  );
};

export default ChatRoom;
