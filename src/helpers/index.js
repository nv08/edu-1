import GetLocation from "react-native-get-location";

export const getLocationCoordinates = () => {
  return GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then((location) => {
      const { longitude, latitude } = location;
      return [longitude, latitude];
    })
    .catch((error) => {
      console.warn(error);
    });
};