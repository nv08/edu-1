import { StyleSheet, View } from "react-native";
import ProfileState from "./component/context/ProfileState";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GetStart from "./src/screens/GetStart";
import LogC from "./src/screens/LogC";
import SignC from "./src/screens/SignC";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";

import WorkProfile from "./src/screens/Studen/Workprofile.js";
import TalentH from "./src/screens/Teache/TalentH.js";
import UserForm from "./src/components/UserForm";
import AccountW from "./src/components/AccountW";


function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Get Start">
        <Stack.Screen
          options={{ headerTitleAlign: "center", headerTransparent: true }}
          name="Get Start"
          component={GetStart}
        />
        <Stack.Screen
          options={{ headerTitleAlign: "center", headerTransparent: true }}
          name="Sign Up"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerTitleAlign: "center", headerTransparent: true }}
          name="Login"
          component={SignIn}
        />
        <Stack.Screen
          options={{ headerTitleAlign: "center", headerTransparent: true }}
          name="Hire Signup"
          component={SignC}
        />
        <Stack.Screen
          options={{ headerTitleAlign: "center", headerTransparent: true, headerShown: false }}
          name="Hire Login"
          component={LogC}
        />
        <Stack.Screen
        options={{ headerTitleAlign: "center", headerTransparent: true }}
        name="UserForm"
        component={UserForm}
      />
   

        <Stack.Screen
          options={{
            headerTitleAlign: "center",
            headerBackVisible: false,
            headerTransparent: true,
          }}
          name="Profile"
          component={WorkProfile}
        />
        <Stack.Screen
          options={{ headerTitleAlign: "center", headerBackVisible: false, headerShown: false }}
          name="Find Talent"
          component={TalentH}
        />
      
       
       
       
       
        <Stack.Screen
          options={{
            headerTitleAlign: "center",
            headerTransparent: true,
            headerBackVisible: false,
            title: "Profile",
          }}
          name="AccountW"
          component={AccountW}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default () => {
  return (
    <ProfileState>
      <App />
    </ProfileState>
  );
};
