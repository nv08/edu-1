import { Alert, Linking } from "react-native";
import GetLocation from "react-native-get-location";

export const getLocationCoordinates = async () => {
  return GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then((location) => {
      const { longitude, latitude } = location;
      return [longitude, latitude];
    })
    .catch((error) => {
      // case if location is turned off
      Alert.alert("Location", "Please turn on the location", [
        {
          text: "turn on",
          onPress: () => Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'),
          style: "cancel",
        },
        {
          text: "cancel",
          onPress: () => null,
        },
      ]);
    });
};