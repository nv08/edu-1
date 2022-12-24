import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { HOST } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import chatroomContext from "../../component/context/chatroomContext";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-paper";

const Inbox = (props) => {
  const [chats, setChats] = useState([]);
  const { currentUserId, handleChatClick, notification } =
    useContext(chatroomContext);
  const navigator = useNavigation();

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

  // setting the clicked user from inbox
  useEffect(() => {
    if (props.route && props.route.params) {
      const { activeUserId } = props.route.params;
      if (activeUserId) {
        handleChatClick(activeUserId);
        navigator.navigate("Chat");
      }
    }
  }, [props]);

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
        <View style={{ position: "relative" }}>
          <MaterialIcons name="account-circle" size={64} />
          <Badge
            children={notification[member.id]}
            visible={Boolean(notification[member.id])}
            style={{position: 'absolute', top: -5, right: -5}}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleChatClick(member.id);
            navigator.navigate("Chat");
          }}
          key={index}
          style={styles.item}
        >
          <Text style={{ fontSize: 20, color: "white" }}>{member.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList data={chats} renderItem={renderItem} />
      </View>
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
