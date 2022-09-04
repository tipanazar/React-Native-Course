import { useState, useRef } from "react";
import {
  View,
  Text,
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

const LoginScreen = () => {
  const secondInput = useRef();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    console.log(formState);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainBlock}>
        <ImageBackground
          style={styles.backgroundImg}
          source={require("../../assets/background.png")}
        />
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS == "ios" && "padding"}
        >
          <Text style={styles.formTitle}>Log In</Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: focusedInput === 0 ? "#FF6C00" : "#E8E8E8",
            }}
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="next"
            keyboardType="email-address"
            placeholder="Your email address"
            blurOnSubmit={false}
            onSubmitEditing={() => secondInput.current.focus()}
            onFocus={() => setFocusedInput(0)}
            onChangeText={(text) =>
              setFormState((prevState) => {
                return { ...prevState, email: text };
              })
            }
          />
          <View style={styles.passwordBlock}>
            <TextInput
              style={{
                ...styles.input,
                marginBottom: 0,
                borderColor: focusedInput === 1 ? "#FF6C00" : "#E8E8E8",
              }}
              autocomplete="password"
              textContentType="password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={isPasswordHidden}
              placeholder="Password"
              ref={secondInput}
              onFocus={() => setFocusedInput(1)}
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
              style={styles.loginBtn}
              activeOpacity={0.5}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Log In</Text>
            </TouchableOpacity>
            <Text style={styles.signupLink}>Haven't account yet? Sign Up</Text>
          </HideWithKeyboard>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainBlock: {
    height: "100%",
  },

  backgroundImg: {
    height: "100%",
  },

  form: {
    fontFamily: "RobotoRegular",
    backgroundColor: "white",
    maxHeight: "87%",
    marginTop: "auto",
    paddingTop: 32,
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
    marginBottom: 46,
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

  loginBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 51,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    lineHeight: 19,
  },

  signupLink: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginBottom: 66,
  },
});
