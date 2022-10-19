import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";

import profileContext from "./profileContext";

const ProfileState = (props) => {

  const host = "http://192.168.1.178:5000";

  const profileInitial = [];

  const [profiles, setProfiles] = useState(profileInitial);

  //fetch one user profile

  const userProfile = async (id) => {
    const response = await fetch(`${host}/api/profile/fetchuserprofile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": await AsyncStorage.getItem("token"),
      },
    });

    const json = await response.json();
    //console.log(json)
    setProfiles(json);
  };

  // fetch all user profiles
  //here is the fetch all profiles
  const getProfile = async () => {
    const response = await fetch(
      `${host}/api/profile/fetchallprofiles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": await AsyncStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    //console.log(json)
    setProfiles(json);
  };

  //add a profile
  const addProfile = async (
    cname,
    email,
    phone,
    city,
    rollno,
    address,
    skills,
    description
  ) => {
    const response = await fetch(`${host}/api/profile/addprofiles`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": await AsyncStorage.getItem("token"),
      },
      body: JSON.stringify({
        cname,
        email,

        phone,
        city,
        rollno,
        address,
        skills,
        description,
      }),
    });
    //const json = response.json()

    const profile = {
      //"_id": "2625eb12bf61a266f6bb8908c",
      //"user": "625d68a690517259c70575c2",
      cname: cname,
      email: email,

      phone: phone,
      city: city,
      rollno: rollno,
      address: address,
      skills: skills,
      description: description,

      // Date: "2022-04-19T12:55:07.666Z",
      //  __v: 0,
    };

    //setProfiles(profiles.concat(profile))
    setProfiles((prev) => [...prev, profile]);
  };

  return (
    <profileContext.Provider
      value={{
        profiles,
        addProfile,
        userProfile,
        getProfile,
      }}
    >
      {props.children}
    </profileContext.Provider>
  );
};

export default ProfileState;
