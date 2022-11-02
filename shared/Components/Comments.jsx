import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Pressable,
} from "react-native";
import * as Clipboard from "expo-clipboard";

import { resetPostErrorAction } from "../../redux/post/postActions";
import { addComment, removeComment } from "../../redux/post/postOperations";
import { getPostsState, getUserState } from "../../redux/selectors";
import dateParser from "../../shared/hooks/dateParser";
import { ArrowUp } from "../../shared/SvgComponents";
import Loader from "./Loader";

const Comments = ({ route }) => {
  const { imgAddress, postId } = route.params;
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const { userId } = useSelector(getUserState);
  const { postsArr, error, isLoading } = useSelector(getPostsState);
  const commentsArr = [
    ...postsArr.find((post) => post.id === postId).commentsArr,
  ].sort((item1, item2) => item2.creationDate - item1.creationDate);

  useEffect(() => {
    if (error) {
      return Alert.alert("Something went wrong...", error, [
        {
          text: "OK",
          onPress: () => dispatch(resetPostErrorAction()),
        },
      ]);
    }
  }, [error]);

  const handleSubmit = () => {
    if (!commentText) {
      return Alert.alert(
        "Oops, your comment is empty!",
        "Write your comment and try again.",
        [{ text: "OK" }]
      );
    }

    const newCommentData = {
      postId,
      text: commentText,
    };
    dispatch(addComment({ newCommentData })).then(
      (ev) => ev.error || setCommentText("")
    );
  };

  const handleDelete = ({ comment }) => {
    Alert.alert("Delete comment?", `Text: «${comment.text}»`, [
      { text: "Copy", onPress: () => Clipboard.setStringAsync(comment.text) },
      { text: "NO" },
      {
        text: "YES",
        onPress: () =>
          dispatch(
            removeComment({
              data: {
                commentObj: comment,
                postId,
              },
            })
          ),
      },
    ]);
  };

  const renderItem = ({ item: comment }) => {
    return (
      <Pressable
        onLongPress={() => handleDelete({ comment })}
        style={{
          ...styles.commentItem,
          flexDirection: comment.sender.id === userId ? "row-reverse" : "row",
        }}
      >
        <View
          style={{
            ...styles.imgWrapper,
            marginVertical: 0,
            marginHorizontal: 0,
          }}
        >
          <Image
            style={{ height: 30, width: 30, borderRadius: 30 }}
            source={{ uri: comment.sender.avatarUrl }}
          />
        </View>
        <View
          style={
            comment.sender.id === userId
              ? { marginRight: 7, maxWidth: "75%" }
              : { marginLeft: 7, maxWidth: "75%" }
          }
        >
          {comment.sender.id !== userId && (
            <Text style={{ marginVertical: 3, fontFamily: "RobotoMedium" }}>
              {comment.sender.name}
            </Text>
          )}
          <View
            style={
              comment.sender.id === userId
                ? {
                    ...styles.itemTextBlock,
                    borderTopRightRadius: 0,
                  }
                : {
                    ...styles.itemTextBlock,
                    borderTopLeftRadius: 0,
                  }
            }
          >
            <Text style={{ fontFamily: "RobotoRegular" }}>{comment.text}</Text>
            <Text style={styles.commentDate}>
              {dateParser(comment.creationDate, "fullDate")}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.mainBlock}>
      {isLoading && <Loader />}
      <FlatList
        style={styles.commentsList}
        data={commentsArr}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={{ uri: imgAddress }} />
          </View>
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={82}
      >
        <View style={styles.formBlock}>
          <TextInput
            style={styles.formInput}
            returnKeyType="next"
            placeholder="Comment..."
            defaultValue={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
          <TouchableOpacity
            style={styles.sendCommentBtn}
            activeOpacity={0.4}
            onPress={handleSubmit}
          >
            <ArrowUp />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  mainBlock: {
    backgroundColor: "white",
    flex: 1,
  },

  imgWrapper: {
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgb(34, 60, 80)",
    shadowOpacity: 1,
    shadowOpacity: 0.2,
    marginVertical: 32,
  },
  img: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },

  commentsList: {
    paddingVertical: 3,
    paddingHorizontal: 16,
  },
  commentItem: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 24,
  },
  itemTextBlock: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
  },
  commentDate: {
    fontFamily: "RobotoRegular",
    fontSize: 11,
    textAlign: "right",
    color: "#BDBDBD",
    marginTop: 8,
  },

  formBlock: {
    display: "flex",
    flexDirection: "row",
    height: 82,
    padding: 16,
  },
  formInput: {
    backgroundColor: "#f6f6f6",
    // height: 50,
    flex: 1,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRightWidth: 0,
    paddingLeft: 16,
  },
  sendCommentBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // height: 50,
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderLeftWidth: 0,
    padding: 8,
    backgroundColor: "#f6f6f6",
  },
});
