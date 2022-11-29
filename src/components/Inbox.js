import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
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
    AsyncStorage.getItem("userId").then((teacherId) => {
      AsyncStorage.getItem("token").then((token) => {
        fetch(`${HOST}/api/chat/${teacherId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        })
          .then((res) => res.json())
          .then((res) => setChats(res));
      });
    });
  }, []);
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
          text: msg,
        }),
      });
    });
  };

  return (
    <View>
      {userId ? (
        <ChatRoom
          sendMessage={sendMessage}
          currentUserId={userId}
          socket={sock}
        />
      ) : (
        <View>
          {chats.map((chat, i) => (
            <View key={i}>
              {currentUserId !== chat.members[0] ? (
                <TouchableOpacity
                  style={{ marginTop: 200 }}
                  onPress={() => {
                    setUserId(chat.members[0]);
                  }}
                >
                  <Text>{chat.members[0]}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ marginTop: 200 }}
                  onPress={() => {
                    setUserId(chat.members[1]);
                  }}
                >
                  <Text>{chat.members[1]}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Inbox;
