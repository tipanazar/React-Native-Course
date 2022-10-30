import { useState, useEffect } from "react";
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
  Alert,
} from "react-native";

import TakePhoto from "../../shared/Components/TakePhoto";
import MapPinIcon from "../../shared/SvgComponents/MapPinIcon";

const CreatePost = () => {
  const isFocused = useIsFocused();
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [img, setImg] = useState({ uri: "", id: "" });
  const [postTitle, setPostTitle] = useState("");
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
  }, []);

  useEffect(() => {
    Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setIsKeyboardShown(true)
    );
    Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setIsKeyboardShown(false)
    );

    if (!isFocused) {
      Keyboard.removeAllListeners(
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow"
      );
      Keyboard.removeAllListeners(
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide"
      );
    }
  }, [isFocused]);

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

  const handleSubmit = () => {
    if (!img.uri) {
      return Alert.alert(
        "Photo should be added!",
        "Take photo and try again.",
        [{ text: "OK" }]
      );
    }
    if (!postTitle) {
      return Alert.alert(
        "Post title should be added!",
        "Add post title and try again.",
        [{ text: "OK" }]
      );
    }
    if (!locationString.isLocation) {
      return Alert.alert(
        "Location should be added!",
        "Choose location and try again.",
        [{ text: "OK" }]
      );
    }
    console.log("все ок");
  };

  // console.log(img.uri)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainBlock}>
        <TakePhoto
          setImgState={(picData) => setImg(picData)}
          imgState={img}
          mainBlockStyle={{
            ...styles.takePhotoBlock,
            display: isKeyboardShown ? "none" : "flex",
          }}
        />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPostTitle(text)}
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
          <TouchableOpacity
            style={styles.publishBtn}
            activeOpacity={0.6}
            onPress={handleSubmit}
          >
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
