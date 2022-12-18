import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SingleForm = (props) => {
  const { item, handleChatNowHandler, handleSubmitComment } = props;
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddCommentClick = () => setOpen(true);

  const handleCanelClick = () => setOpen(false);

  const handleClickSubmit = () => {
    handleSubmitComment(item._id, comment);
    setOpen(false);
    setComment('');
  };

  return (
    <View style={styles.boxes}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,

            color: "black",
          }}
        >
          {item.cname}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <Text>Email</Text>
          <Text style={styles.textStyle}>{item.email} </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <Text>City</Text>
          <Text style={styles.textStyle}>{item.city} </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <Text>Roll No.</Text>
          <Text style={styles.textStyle}>{item.rollno}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 5,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <Text>Address</Text>
          <Text style={styles.textStyle}>{item.address}</Text>
        </View>
        <View
          style={{
            display: "flex",
            paddingHorizontal: 5,
            paddingVertical: 3,
            alignItems: "center",
          }}
        >
          <Text style={styles.textStyle0}>Subjects</Text>
          <Text style={styles.textStyle}>{item.skills}</Text>
          {open && (
            <View style={styles.rowView}>
              <TextInput
                style={styles.TalUp}
                autoCapitalize="none"
                autoCorrect={false}
                value={comment}
                placeholder="Type Comment..."
                onChangeText={(newComment) => setComment(newComment)}
              />
              <TouchableOpacity onPress={handleClickSubmit}>
                <MaterialIcons name="send" size={32} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => handleChatNowHandler(item)}
          >
            <Text> Chat Now</Text>
          </TouchableOpacity>
          {!open ? (
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={handleAddCommentClick}
            >
              <Text> Add comment</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.buttonStyles}
              onPress={handleCanelClick}
            >
              <Text> Cancel </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxes: {},
  textStyle: {
    color: "grey",

    fontSize: 15,
  },
  TalUp: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    height: 40,
    width: "70%",
    backgroundColor: "white",
  },
  rowView: {
    width: "60%",
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
  buttonWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    width: "60%",
    justifyContent: "space-evenly",
  },
  buttonStyles: {
    alignSelf: "center",
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});

export default SingleForm;