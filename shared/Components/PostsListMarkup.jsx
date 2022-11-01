import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import dateParser from "../hooks/dateParser";
import { CommentIcon, LikeIcon, MapPinIcon } from "../SvgComponents";

const PostsListMarkup = ({ navigation, postsArr, listHeaderComponent }) => {
  const renderItem = ({ item: post }) => {
    return (
      <View
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
            {post.postName}
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
                commentsArr: post.comments,
              })
            }
          >
            <CommentIcon style={{ marginRight: 0 }} />
            <Text style={styles.postText}>
              &nbsp;&#8210;&nbsp;{post.comments.length}
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
          <LikeIcon />
          <Text style={styles.postText}>&nbsp;&#8210;&nbsp;{post.likes}</Text>
        </View>
      </View>
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
