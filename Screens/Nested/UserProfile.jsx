import { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { LogoutIcon, AddAvatarIcon } from "../../shared/SvgComponents";

import POSTS_DB from "../../shared/posts.json";
import PostsListMarkup from "../../shared/Components/PostsListMarkup";

const Profile = ({ navigation }) => {
  const [isImageSet, setIsImageSet] = useState(false);

  return (
    <ImageBackground
      style={{ height: "100%" }}
      source={require("../../assets/background.png")}
    >
      <PostsListMarkup
        postsArr={POSTS_DB.Posts}
        navigation={navigation}
        listHeaderComponent={
          <View style={styles.listHeaderBlock}>
            <TouchableOpacity
              style={styles.userAvatarBlock}
              activeOpacity={0.8}
              onPress={() => setIsImageSet(!isImageSet)}
            >
              {isImageSet ? (
                <>
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 16,
                    }}
                    source={require("../../assets/myAvatar.jpg")}
                  />
                  <AddAvatarIcon
                    style={{
                      ...styles.userAvatarIcon,
                      transform: [{ rotate: "45deg" }],
                    }}
                    fill="#BDBDBD"
                  />
                </>
              ) : (
                <AddAvatarIcon style={styles.userAvatarIcon} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutBtn}
              activeOpacity={0.5}
              onPress={() => console.log("logout")}
            >
              <LogoutIcon />
            </TouchableOpacity>
            <Text style={styles.userName}>Nazar Karpeko</Text>
          </View>
        }
      />
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backgroundImg: {
    height: "100%",
  },

  listHeaderBlock: {
    marginTop: 250,
    backgroundColor: "white",
    height: 160,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  userAvatarBlock: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
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
  logoutBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    width: 60,
    height: 80,
  },
  userName: {
    marginTop: 92,
    fontFamily: "RobotoMedium",
    textAlign: "center",
    fontSize: 30,
  },

  imageWrapper: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgb(34, 60, 80)",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
