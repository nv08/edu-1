import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import { io } from "socket.io-client";
import { HOST } from "../constants";
import ChatRoom from "./ChatRoom";

const sock = io(HOST);
const Inbox = (props) => {
  const [userId, setUserId] = useState("");
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userId").then((userId) => {
      setCurrentUserId(userId);
      sock.emit("new-user-add", userId);
    });
  }, []);
  useEffect(() => {
    if (currentUserId) {
      AsyncStorage.getItem("token").then((token) => {
        fetch(`${HOST}/api/chat/${userId}/${currentUserId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        })
          .then((res) => res.json())
          .then((res) => setChats(res));
      });
    }
  }, [currentUserId]);
  useEffect(() => {
    if (props.route && props.route.params) {
      const { activeUserId } = props.route.params;
      setUserId(activeUserId || "");
    }
  }, [props]);

  useEffect(() => {
    sock.connect();
    // switching socket off on unmount
    return () => sock.off();
  }, []);

  const sendMessage = (msg) => {
    sock.emit("send-message", {
      receiverId: userId,
      data: msg,
      senderId: currentUserId,
    });
    AsyncStorage.getItem("token").then((token) => {
      fetch(`${HOST}/api/message/sendmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          chatId: userId,
          senderId: currentUserId,
          receiverId: userId,
          text: msg,
        }),
      });
    });
  };

  const renderItem = ({ item: chat, index }) => {
    let member;
    // now sender Details & receiver details coming
    if (currentUserId !== chat.members[0]) {
      member = chat.members[0];
    } else {
      member = chat.members[1];
    }

    return (
      <TouchableOpacity
        onPress={() => {
          setUserId(member);
        }}
        key={index}
        style={styles.item}
      >
        <Text>{member}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {userId ? (
        <ChatRoom
          sendMessage={sendMessage}
          currentUserId={userId}
          socket={sock}
        />
      ) : (
        <View style={styles.container}>
          <FlatList data={chats} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    borderColor: "red",
    // borderWidth:1,
    padding: 5,
  },
  item: {
    backgroundColor: "#3498db",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Inbox;
