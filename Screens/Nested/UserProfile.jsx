import { useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";

import { resetUserErrorAction } from "../../redux/user/userActions";
import { logoutUser, uploadUserAvatar } from "../../redux/user/userOperations";
import {
  getPostsState,
  getPrimaryUserState,
  getUserState,
} from "../../redux/selectors";

import PostsListMarkup from "../../shared/Components/PostsListMarkup";
import { LogoutIcon, AddAvatarIcon } from "../../shared/SvgComponents";

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(getPrimaryUserState);
  const { username, avatarUrl, userId } = useSelector(getUserState);
  const { postsArr } = useSelector(getPostsState);
  const filteredPostsArr = postsArr.filter((post) => post.postOwner === userId);

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

  const handleImagePicker = async () => {
    const photo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });
    if (photo.cancelled) {
      return;
    }
    dispatch(uploadUserAvatar({ photo }));
  };

  return (
    <ImageBackground
      style={{ height: "100%" }}
      source={require("../../assets/background.png")}
    >
      <PostsListMarkup
        postsArr={filteredPostsArr}
        navigation={navigation}
        listHeaderComponent={
          <View
            style={
              filteredPostsArr.length
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
              onPress={handleImagePicker}
            >
              {avatarUrl ? (
                <>
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 16,
                    }}
                    source={{ uri: avatarUrl }}
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
});
