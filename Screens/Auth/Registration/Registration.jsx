import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";

import Icon from "../../../shared/SvgComponents/AddAvatarIcon";

const Registration = ({ navigation }) => {
  const secondInput = useRef();
  const thirdInput = useRef();
  const [isImageSet, setIsImageSet] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(formState);
    navigation.navigate('Home')
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainBlock}>
        <ImageBackground
          style={styles.backgroundImg}
          source={require("../../../assets/background.png")}
        />
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS == "ios" && "padding"}
        >
          <TouchableOpacity
            style={styles.userAvatarBlock}
            activeOpacity={0.9}
            onPress={() => setIsImageSet(!isImageSet)}
          >
            {isImageSet ? (
              <>
                <Image
                  style={{ height: "100%", width: "100%", borderRadius: 16 }}
                  source={require("../../../assets/myAvatar.jpg")}
                />
                <Icon
                  style={{
                    ...styles.userAvatarIcon,
                    transform: [{ rotate: "45deg" }],
                  }}
                  fill="#BDBDBD"
                />
              </>
            ) : (
              <Icon style={styles.userAvatarIcon} />
            )}
          </TouchableOpacity>
          <Text style={styles.formTitle}>Sign Up</Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: focusedInput === 0 ? "#FF6C00" : "#E8E8E8",
            }}
            autoComplete="username-new"
            textContentType="username"
            autoCapitalize="none"
            returnKeyType="next"
            placeholder="Username"
            onSubmitEditing={() => secondInput.current.focus()}
            blurOnSubmit={false}
            onFocus={() => setFocusedInput(0)}
            onChangeText={(text) =>
              setFormState((prevState) => {
                return { ...prevState, username: text };
              })
            }
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: focusedInput === 1 ? "#FF6C00" : "#E8E8E8",
            }}
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
            placeholder="Your email address"
            onSubmitEditing={() => thirdInput.current.focus()}
            ref={secondInput}
            blurOnSubmit={false}
            onFocus={() => setFocusedInput(1)}
            onChangeText={(text) =>
              setFormState((prevState) => {
                return { ...prevState, email: text };
              })
            }
          />
          <View style={{ ...styles.passwordBlock, marginBottom: 46 }}>
            <TextInput
              style={{
                ...styles.input,
                marginBottom: 0,
                borderColor: focusedInput === 2 ? "#FF6C00" : "#E8E8E8",
              }}
              autocomplete="password-new"
              textContentType="newPassword"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={isPasswordHidden}
              placeholder="Password"
              ref={thirdInput}
              onFocus={() => setFocusedInput(2)}
              onChangeText={(text) =>
                setFormState((prevState) => {
                  return { ...prevState, password: text };
                })
              }
            />
            <TouchableOpacity
              style={styles.showPasswordBtn}
              activeOpacity={0.6}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            >
              <Text style={styles.showPasswordText}>
                {isPasswordHidden ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          </View>
          <HideWithKeyboard>
            <TouchableOpacity
              style={styles.signupBtn}
              activeOpacity={0.5}
              onPress={handleSubmit}
            >
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Log In")}>
              <Text style={styles.loginLink}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </HideWithKeyboard>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default Registration;

const styles = StyleSheet.create({
  mainBlock: {
    fontFamily: "RobotoRegular",
    height: "100%",
  },

  backgroundImg: {
    height: "100%",
  },

  form: {
    backgroundColor: "white",
    position: "relative",
    maxHeight: "87%",
    marginTop: "auto",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  formTitle: {
    fontFamily: "RobotoMedium",
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 33,
    color: "#212121",
    textAlign: "center",
  },
  userAvatarBlock: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userAvatarIcon: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },

  input: {
    backgroundColor: "#F6F6F6",
    width: "100%",
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
  },
  passwordBlock: {
    position: "relative",
    width: "100%",
  },
  showPasswordBtn: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    height: "100%",
    width: "20%",
  },
  showPasswordText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  signupBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  signupText: {
    color: "white",
    fontSize: 16,
    lineHeight: 19,
  },

  loginLink: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginBottom: 66,
    textDecorationLine: "underline",
  },
});
