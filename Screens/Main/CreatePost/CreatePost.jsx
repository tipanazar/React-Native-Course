import { useState, useEffect, useRef } from "react";
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
import { useIsFocused } from "@react-navigation/native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import TakePhoto from "../../../shared/Components/TakePhoto";

const CreatePost = () => {
  const isFocused = useIsFocused();
  const secondInput = useRef()
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => setIsKeyboardShown(true)
    );
    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setIsKeyboardShown(false)
    );
    // console.log(isKeyboardShown);

    if (!isFocused) {
      // console.log("remove");
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    }
  });

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
            returnKeyType="next"
            onSubmitEditing={()=>secondInput.current.focus()}
            placeholder="Title..."
          />
          <TextInput
            style={{ ...styles.input, marginBottom: 32 }}
            returnKeyType="done"
            ref={secondInput}
            placeholder="Location..."
          />
          <TouchableOpacity style={styles.publishBtn} activeOpacity={0.6}>
            <Text style={{ fontSize: 16, color: "#fff" }}>Publish</Text>
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
    // height: 260,
    marginBottom: 35,
  },

  input: {
    height: 45,
    fontSize: 16,
    color: "#212121",
    // padding: 15
    marginBottom: 23,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  publishBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});
