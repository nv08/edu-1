import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HOST } from "../../src/constants";
import { countMessages } from "../../src/helpers";
import chatroomContext from "./chatroomContext";

const sock = io(HOST);

const ChatRoomState = (props) => {
  const [unreadMessage, setUnreadMessage] = useState(0);
  const [currentUserId, setCurrentUserId] = useState("");
  const [activeUserId, setActiveUserId] = useState("");
  const [chatroomData, setChatroomData] = useState([]);
  const [notification, setNotification] = useState({});

  useEffect(() => {
    if (sock && !sock.isConnected) {
      AsyncStorage.getItem("userId").then((currentUser) => {
        if (currentUser) {
          sock.connect();
          setCurrentUserId(currentUser);
          sock.emit("new-user-add", currentUser);
        }
      });
    }
    return () => sock.disconnect();
  }, [currentUserId]);

  const receiveMsgFromSocket = () => {
    sock.on("recieve-message", (payload) => {
      if (payload.senderId !== activeUserId) {
        const msgObj = {
          senderId: payload.senderId,
          receiverId: payload.receiverId,
          text: payload.data,
        };
        setChatroomData((messages) => {
          return [...messages, msgObj];
        });

        if (notification[payload.senderId]) {
          notification[payload.senderId]++;
        } else {
          notification[payload.senderId] = 1;
        }

        setUnreadMessage(countMessages(notification));
        setNotification({...notification});
      }
    });
  };

  useEffect(() => {
    receiveMsgFromSocket();
    return () => {
      sock.off("receive-message");
    };
  }, []);

  // handler for sending message
  const sendMessage = (msg) => {
    try {
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

      //setting send message in local state
      const msgObj = {
        senderId: currentUserId,
        receiverId: activeUserId,
        text: msg,
      };
      setChatroomData([...chatroomData, msgObj]);
    } catch (err) {
      console.log("error while sending message");
    }
  };

  //handler when a chat of particular person is clicked
  const handleChatClick = (id) => {
    if (id) {
      delete notification[id];
      setUnreadMessage(countMessages(notification));
      setNotification(notification);
      setActiveUserId(id);
    }
  };

  const clearData = () => {
    setNotification([]);
    setUnreadMessage(0);
    setActiveUserId('');
    setCurrentUserId('');
    setChatroomData([]);
  }

  return (
    <chatroomContext.Provider
      value={{
        unreadMessage,
        activeUserId,
        currentUserId,
        chatroomData,
        notification,
        setUnreadMessage,
        setChatroomData,
        handleChatClick,
        sendMessage,
        clearData,
      }}
    >
      {props.children}
    </chatroomContext.Provider>
  );
};

export default ChatRoomState;
