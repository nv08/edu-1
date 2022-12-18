import { View, Text, Alert, PermissionsAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import profileContext from "./profileContext";
import { HOST } from "../../src/constants";
import { getLocationCoordinates } from "../../src/helpers";

const ProfileState = (props) => {
  const profileInitial = [];

  const [profiles, setProfiles] = useState(profileInitial);
  const [location, setLocation] = useState(undefined);
  //fetch one user profile

  const checkLocationPermission = async () => {
    try {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!hasPermission) {
        const permissionGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (permissionGranted) {
          const coordinates = await getLocationCoordinates();
          if (coordinates) {
            setLocation(coordinates);
          }
        }
      } else {
        const coordinates = await getLocationCoordinates();
        if (coordinates) {
          setLocation(coordinates);
        }
      }
    } catch (err) {
      console.log("permission not granted");
      setLocation(null);
    }
  };
  useEffect(() => {
    if (location === undefined) {
      checkLocationPermission();
    }
    if (location && location[0] && location[1]) {
      UpdateLocation();
    }
  }, [location]);

  const UpdateLocation = async () => {
    console.log(location, 'feh');
    try {
      const token = await AsyncStorage.getItem("token");
      if(!token) return;
      const response =  await fetch(`${HOST}/api/profile/updateLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({
          longitude: location[0],
          latitude: location[1],
        }),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const userProfile = async (id) => {
    const response = await fetch(`${HOST}/api/profile/fetchuserprofile/${id}`, {
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
    const response = await fetch(`${HOST}/api/profile/fetchallprofiles`, {
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
    const response = await fetch(`${HOST}/api/profile/addprofiles`, {
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
        location,
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
        location,
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
