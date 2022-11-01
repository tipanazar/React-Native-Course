import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Alert,
} from "react-native";
import HideWithKeyboard from "react-native-hide-with-keyboard";

import { getPrimaryUserState } from "../../redux/selectors";
import { loginUser } from "../../redux/user/userOperations";
import { resetUserErrorAction } from "../../redux/user/userActions";

import Loader from "../../shared/Components/Loader";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getPrimaryUserState);
  const emailInput = useRef();
  const passwordInput = useRef();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      return Alert.alert("Something went wrong...", error, [
        {
          text: "OK",
          onPress: () => dispatch(resetUserErrorAction()),
        },
      ]);
    }
  }, [error]);

  const handleSubmit = () => {
    const { email, password } = formData;
    if (!EMAIL_REGEX.test(email)) {
      return Alert.alert("Invalid Email!", "Use valid email and try again.", [
        {
          text: "OK",
          onPress: () => emailInput.current.focus(),
        },
      ]);
    }
    if (password.length < 6) {
      return Alert.alert(
        "Invalid Password!",
        "Password must contains at least 6 characters.",
        [
          {
            text: "OK",
            onPress: () => passwordInput.current.focus(),
          },
        ]
      );
    }
    dispatch(loginUser(formData));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setFocusedInput(null);
      }}
    >
      <View style={styles.mainBlock}>
        {isLoading && <Loader />}
        <ImageBackground
          style={styles.backgroundImg}
          source={require("../../assets/background.png")}
        />
        <KeyboardAvoidingView
          style={styles.form}
          behavior={Platform.OS === "ios" && "padding"}
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
            onSubmitEditing={() => passwordInput.current.focus()}
            onFocus={() => setFocusedInput(0)}
            ref={emailInput}
            onChangeText={(text) =>
              setFormData((prevState) => {
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
              ref={passwordInput}
              onFocus={() => setFocusedInput(1)}
              onChangeText={(text) =>
                setFormData((prevState) => {
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
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
              <Text style={styles.signupLink}>
                Haven't account yet? Sign Up
              </Text>
            </TouchableOpacity>
          </HideWithKeyboard>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

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
    textDecorationLine: "underline",
  },
});

