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
import { MaterialIcons } from "@expo/vector-icons";

const sock = io(HOST);
const Inbox = (props) => {
  const [activeUserId, setActiveUserId] = useState("");
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("userId").then((activeUserId) => {
      setCurrentUserId(activeUserId);
      sock.emit("new-user-add", activeUserId);
    });
    return () => sock.off("new-user-add");
  }, []);
  useEffect(() => {
    if (currentUserId) {
      AsyncStorage.getItem("token").then((token) => {
        fetch(`${HOST}/api/chat/${currentUserId}`, {
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
      setActiveUserId(activeUserId || "");
    }
  }, [props]);

  useEffect(() => {
    sock.connect();
    return () => {
      sock.off("new-user-add");
      sock.off("send-message");
    }
  }, []);

  const sendMessage = (msg) => {
    sock.emit("send-message", {
      receiverId: activeUserId,
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
          chatId: activeUserId,
          senderId: currentUserId,
          receiverId: activeUserId,
          text: msg,
        }),
      });
    });
  };

  const renderItem = ({ item: chat, index }) => {
    let member;
    if (currentUserId !== chat.senderDetails.id) {
      member = chat.senderDetails;
    } else {
      member = chat.receiverDetails;
    }

    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MaterialIcons name="account-circle" size={64} />
        <TouchableOpacity
          onPress={() => {
            setActiveUserId(member.id);
          }}
          key={index}
          style={styles.item}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>{member.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {activeUserId ? (
        <ChatRoom
          sendMessage={sendMessage}
          activeUserId={activeUserId}
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
    padding: 20,
  },
  item: {
    backgroundColor: "#3498db",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 32,
  },
});

export default Inbox;
