import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";

import {
  addLike,
  deletePost,
  removeLike,
} from "../../redux/post/postOperations";
import { getUserId } from "../../redux/selectors";

import dateParser from "../hooks/dateParser";
import { CommentIcon, LikeIcon, MapPinIcon } from "../SvgComponents";

const PostsListMarkup = ({
  navigation,
  postsArr,
  listHeaderComponent,
  removable,
}) => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);

  const renderItem = ({ item: post }) => {
    const isLiked = post.likesArr.includes(userId);
    return (
      <Pressable
        onLongPress={() =>
          removable &&
          Alert.alert("Delete Post?", `Post: «${post.postTitle}»`, [
            { text: "No" },
            {
              text: "Yes",
              onPress: () => dispatch(deletePost({ postId: post.id })),
            },
          ])
        }
        style={{
          paddingBottom: 35,
          paddingHorizontal: 16,
          backgroundColor: "white",
        }}
      >
        <View style={styles.imageWrapper}>
          <Image
            style={styles.postImage}
            source={{
              uri: post.postImage,
            }}
          />
        </View>
        <View style={styles.postTextWrapper}>
          <Text
            style={{
              ...styles.postText,
              marginRight: "auto",
              fontFamily: "RobotoMedium",
              color: "#212121",
            }}
          >
            {post.postTitle}
          </Text>
          <Text style={styles.postText}>{dateParser(post.creationDate)}</Text>
        </View>
        <View style={styles.postTextWrapper}>
          <TouchableOpacity
            style={styles.postButton}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("Comments", {
                imgAddress: post.postImage,
                commentsArr: post.commentsArr,
                postId: post.id,
              })
            }
          >
            <CommentIcon style={{ marginRight: 0 }} />
            <Text style={styles.postText}>
              &nbsp;&#8210;&nbsp;{post.commentsArr.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postButton}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("Map", {
                location: post.postLocation,
                title: post.postName,
              })
            }
          >
            <MapPinIcon style={{ marginRight: 1 }} fill="#FF6C00" />
            <Text
              style={{
                ...styles.postText,
                textAlign: "right",
                textDecorationLine: "underline",
              }}
            >
              {post.postLocation.locationString}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...styles.postTextWrapper,
            justifyContent: "flex-start",
            marginBottom: 0,
          }}
        >
          <TouchableOpacity
            style={styles.postButton}
            activeOpacity={0.3}
            onPress={() =>
              isLiked
                ? removeLike({ postId: post.id })
                : addLike({ postId: post.id })
            }
          >
            <LikeIcon fill={isLiked ? "#FF6C00" : null} />
            <Text style={styles.postText}>
              &nbsp;&#8210;&nbsp;{post.likesArr.length}
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      height="100%"
      data={postsArr.sort(
        (post1, post2) => post2.creationDate - post1.creationDate
      )}
      renderItem={renderItem}
      keyExtractor={(post) => post.id}
      ListHeaderComponent={listHeaderComponent}
    />
  );
};

export default PostsListMarkup;

const styles = StyleSheet.create({
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
