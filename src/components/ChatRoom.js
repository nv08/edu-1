import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useRef, useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { HOST } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import chatroomContext from "../../component/context/chatroomContext";

const ChatRoom = (props) => {
  const {
    currentUserId,
    chatroomData,
    setChatroomData,
    activeUserId,
    sendMessage,
  } = useContext(chatroomContext);
  const [msg, setMsg] = useState("");
  const MsgChangeHandler = (e) => {
    setMsg(e);
  };
  const scrollViewRef = useRef();

  
  //fetching chat of particular person from DB
  useEffect(() => {
    if (currentUserId) {
      AsyncStorage.getItem("token").then((token) => {
        fetch(`${HOST}/api/message/${currentUserId}/${activeUserId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        })
          .then((res) => res.json())
          .then((res) => setChatroomData([...res])); //extract messages from here and set in chatroomdata);
      });
    }
  }, []);

  const Receiver = ({ msg }) => {
    return (
      <View style={styles.messageRecieverBox}>
        <Text style={{ fontSize: 15 }}>{msg}</Text>
      </View>
    );
  };

  const Sender = ({ msg }) => {
    return (
      <View style={styles.messageSenderBox}>
        <Text style={{ fontSize: 15 }}>{msg}</Text>
      </View>
    );
  };

  const onMessageSend = (msg) => {
    sendMessage(msg);
    setMsg("");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ marginTop: 80 }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <View>
          {chatroomData.map((chat, i) => {
            if (chat.senderId === currentUserId) {
              return <Sender msg={chat.text} key={i} />;
            } else {
              return <Receiver msg={chat.text} key={i} />;
            }
          })}
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
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={msg}
            id="name"
            onChangeText={MsgChangeHandler}
            placeholder="Write your message"
          />
          <TouchableOpacity onPress={() => msg && onMessageSend(msg)} style={{position: 'absolute'}}>
            <MaterialIcons name="send" size={32} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBoxArea: {
    width: "100%",
  },
  messageRecieverBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
    maxWidth: "80%",
    marginHorizontal: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderTopLeftRadius: 4,
  },
  messageSenderBox: {
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    maxWidth: "80%",
    paddingVertical: 4,
    marginHorizontal: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderBottomRightRadius: 4,
  },
});

export default ChatRoom;
