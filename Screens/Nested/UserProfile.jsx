import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";

import { resetErrorAction } from "../../redux/user/userActions";
import { logoutUser } from "../../redux/user/userOperations";
import { getPrimaryUserState, getUserState } from "../../redux/selectors";

import PostsListMarkup from "../../shared/Components/PostsListMarkup";
import { LogoutIcon, AddAvatarIcon } from "../../shared/SvgComponents";
// const POSTS_DB = { Posts: [] };
import POSTS_DB from "../../shared/posts.json";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(getPrimaryUserState);
  const { username } = useSelector(getUserState);
  const [isImageSet, setIsImageSet] = useState(false);

  useEffect(() => {
    if (error) {
      return Alert.alert("Something went wrong...", error, [
        {
          text: "OK",
          onPress: () => dispatch(resetErrorAction()),
        },
      ]);
    }
  }, [error]);

  return (
    <ImageBackground
      style={{ height: "100%" }}
      source={require("../../assets/background.png")}
    >
      <PostsListMarkup
        postsArr={POSTS_DB.Posts}
        navigation={navigation}
        listHeaderComponent={
          <View
            style={
              POSTS_DB.Posts.length
                ? { ...styles.listHeaderBlock }
                : {
                    ...styles.listHeaderBlock,
                    height:
                      Platform.OS === "ios"
                        ? Dimensions.get("window").height - 79 - 500
                        : Dimensions.get("window").height - 49 - 500,
                    marginTop: 500,
                  }
            }
          >
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
              onPress={() => dispatch(logoutUser())}
            >
              <LogoutIcon />
            </TouchableOpacity>
            <Text style={styles.userName}>{username}</Text>
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
    paddingBottom: 33,
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
    paddingHorizontal: 16,
  },

  imageWrapper: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgb(34, 60, 80)",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
