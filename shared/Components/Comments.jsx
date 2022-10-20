import {
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import dateParser from "../../shared/hooks/dateParser";
import { ArrowUp } from "../../shared/SvgComponents";

const Comments = ({ route }) => {
  const { imgAddress, commentsArr } = route.params;
  const renderItem = ({ item: comment }) => {
    return (
      <View
        style={{
          ...styles.commentItem,
          flexDirection: comment.sender.type === "you" ? "row-reverse" : "row",
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
            source={{ uri: comment.sender.senderAvatar }}
          />
        </View>
        <View
          style={
            comment.sender.type === "you"
              ? { marginRight: 7, maxWidth: "75%" }
              : { marginLeft: 7, maxWidth: "75%" }
          }
        >
          {comment.sender.type !== "you" && (
            <Text style={{ marginVertical: 3, fontFamily: "RobotoMedium" }}>
              {comment.sender.senderName}
            </Text>
          )}
          <View
            style={
              comment.sender.type === "you"
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
      </View>
    );
  };

  return (
    <View style={styles.mainBlock}>
      <FlatList
        style={styles.commentsList}
        data={commentsArr.sort(
          (item1, item2) => item1.creationDate - item2.creationDate
        )}
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
          />
          <TouchableOpacity
            style={styles.sendCommentBtn}
            activeOpacity={1}
            onPress={() => console.log("send")}
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
