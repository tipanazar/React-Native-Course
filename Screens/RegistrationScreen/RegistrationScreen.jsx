import { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Icon from "./Icon";

const RegistrationScreen = () => {
  const [isImageSet, setIsImageSet] = useState(false);
  return (
    <View style={styles.mainBlock}>
      <ImageBackground
        style={styles.backgroundImg}
        source={require("../../assets/background.png")}
      />
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.userAvatarBlock}
          activeOpacity={0.9}
          onPress={() => setIsImageSet(!isImageSet)}
        >
          {isImageSet ? (
            <>
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 16 }}
                source={require("../../assets/myAvatar.jpg")}
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
        <TextInput style={styles.input} type="text" placeholder="Login" />
        <TextInput
          style={styles.input}
          type="email"
          placeholder="Your email address"
        />
        <View style={styles.passwordBlock}>
          <TextInput
            style={{ ...styles.input, marginBottom: 0 }}
            type="password"
            placeholder="Password"
          />
          <TouchableOpacity style={styles.showPasswordBtn}>
            <Text style={styles.showPasswordText}>Show</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signupBtn}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.loginLink}>Already have an account? Log In</Text>
      </View>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  mainBlock: {
    height: "100%",
  },

  backgroundImg: {
    height: "100%",
  },

  form: {
    backgroundColor: "white",
    position: "relative",
    height: "68%",
    marginTop: "auto",
    paddingTop: 92,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  formTitle: {
    // !   Добавить font-weight 500
    fontSize: 30,
    lineHeight: 0.85,
    letterSpacing: "0.01em",
    color: "#212121",
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
    borderColor: "#E8E8E8",
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 0.84,
  },
  passwordBlock: {
    position: "relative",
    width: "100%",
    marginBottom: 43,
  },
  showPasswordBtn: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 0,
    height: "100%",
    width: "20%",
    // backgroundColor: "green",
  },
  showPasswordText: {
    fontSize: 16,
    lineHeight: 0.84,
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
    lineHeight: 0.84,
  },

  loginLink: {
    fontSize: 16,
    lineHeight: 0.84,
    textAlign: "center",
    color: "#1B4371",
  },
});
