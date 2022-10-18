import { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import TakePhoto from "../../../shared/Components/TakePhoto";
import MapPinIcon from "../../../shared/SvgComponents/MapPinIcon";

const CreatePost = () => {
  const isFocused = useIsFocused();
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [locationString, setLocationString] = useState({
    text: "Press to find location",
    isLocation: false,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationString("Permission to access location was denied");
        return;
      }
    })();

    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setIsKeyboardShown(true)
    );
    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setIsKeyboardShown(false)
    );

    if (!isFocused) {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    }
  });

  const setLocation = async () => {
    if (locationString !== "Permission to access location was denied") {
      setLocationString({ text: "Waiting...", isLocation: false });
      let location = await Location.getCurrentPositionAsync({});
      const parsedLocation = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      setLocationString({
        text: `${parsedLocation[0].street}, ${parsedLocation[0].city}, ${parsedLocation[0].country}`,
        isLocation: true,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainBlock}>
        <TakePhoto
          mainBlockStyle={{
            ...styles.takePhotoBlock,
            display: isKeyboardShown ? "none" : "flex",
          }}
        />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            returnKeyType="done"
            placeholder="Title..."
          />
          <TouchableOpacity
            style={{
              ...styles.input,
              ...styles.locationBtn,
            }}
            activeOpacity={0.5}
            onPress={setLocation}
          >
            <MapPinIcon />

            <Text
              style={{
                ...styles.locationBtnText,
                color: locationString.isLocation ? "#212121" : "#BDBDBD",
              }}
            >
              {locationString.text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishBtn} activeOpacity={0.6}>
            <Text style={styles.publishBtnText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  mainBlock: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  takePhotoBlock: {
    marginBottom: 35,
  },

  input: {
    height: 45,
    fontSize: 16,
    color: "#212121",
    marginBottom: 23,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "RobotoRegular",
  },

  locationBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  locationBtnText: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "RobotoRegular",
  },

  publishBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },

  publishBtnText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "RobotoRegular",
  },
});
