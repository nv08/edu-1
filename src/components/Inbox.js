import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Inbox = (props) => {
 
  const [userId, setUserId] = useState("");
  useEffect(()=>{
        if(props.route && props.route.params){
            const {activeUserId} = props.route.params;
            setUserId(activeUserId || '');
        }
    },[props])  
  return (
    <View>
      {userId ? (
        <Text>This is the inbox screen with some active user</Text>
      ) : (
        <Text> This is the inbox where all users are there</Text>
      )}
    </View>
  );
};

export default Inbox;
