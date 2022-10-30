import { useEffect } from "react";
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getPrimaryUserState, getUserState } from "../../redux/selectors";
import { resetErrorAction } from "../../redux/user/userActions";
import PostsListMarkup from "../../shared/Components/PostsListMarkup";

import POSTS_DB from "../../shared/posts.json";
// const POSTS_DB = {Posts: []}

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(getPrimaryUserState);
  const { username, userEmail, avatarUrl } = useSelector(getUserState);

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
    <View style={{ backgroundColor: "white" }}>
      <PostsListMarkup
        postsArr={POSTS_DB.Posts}
        navigation={navigation}
        listHeaderComponent={
          <View style={styles.userBlock}>
            <Image style={styles.userAvatar} source={{ uri: avatarUrl }} />
            <View>
              <Text style={styles.userBlockLogin}>{username}</Text>
              <Text style={styles.userBlockEmail}>{userEmail}</Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  userBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
    paddingHorizontal: 16,
  },
  userAvatar: {
    height: 80,
    width: 80,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#F6F6F6",
  },
  userBlockLogin: {
    marginBottom: 2,
    fontFamily: "RobotoBold",
    fontSize: 16,
  },
  userBlockEmail: {
    fontFamily: "RobotoRegular",
    fontSize: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },

  imageWrapper: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgb(34, 60, 80)",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  postImage: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  postTextWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 11,
    paddingHorizontal: 3,
  },
  postText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: "#403f3f",
  },
  postButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
