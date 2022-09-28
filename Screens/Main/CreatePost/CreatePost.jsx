import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import HideWithKeyboard from "react-native-hide-with-keyboard";

import TakePhoto from "../../../shared/Components/TakePhoto";

const CreatePost = () => {
  console.log(Keyboard)
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainBlock}>
        <HideWithKeyboard>
          <TakePhoto mainBlockStyle={styles.takePhotoBlock} />
        </HideWithKeyboard>
        {/* <KeyboardAvoidingView
          // style={styles.form}
          behavior={Platform.OS == "ios" && "padding"}
        > */}
          <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Title..." />
          <TextInput
            style={{ ...styles.input, marginBottom: 32 }}
            placeholder="Location..."
          />
          <TouchableOpacity style={styles.publishBtn} activeOpacity={0.6}>
            <Text style={{ fontSize: 16, color: "#fff" }}>Publish</Text>
          </TouchableOpacity>
          </View>
        {/* </KeyboardAvoidingView> */}
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
    height: 260,
    marginBottom: 48,
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
 