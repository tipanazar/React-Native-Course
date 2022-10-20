import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import dateParser from "../../shared/hooks/dateParser";
import { CommentIcon, LikeIcon } from "../../shared/SvgComponents";
import MapPinIcon from "../../shared/SvgComponents/MapPinIcon";

import POSTS_DB from "./posts.json";

const Home = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 35 }}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.postImage}
            source={{
              uri: item.photoAddress,
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
            {item.postName}
          </Text>
          <Text style={styles.postText}>{dateParser(item.creationDate)}</Text>
        </View>
        <View style={styles.postTextWrapper}>
          <TouchableOpacity
            style={styles.postButton}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("Comments", {
                imgAddress: item.photoAddress,
                commentsArr: item.comments,
              })
            }
          >
            <CommentIcon style={{ marginRight: 3 }} />
            <Text style={styles.postText}>{item.comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postButton}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("Map")}
          >
            <MapPinIcon style={{ marginRight: 3 }} fill="#FF6C00" />
            <Text
              style={{
                ...styles.postText,
                textAlign: "right",
                textDecorationLine: "underline",
              }}
            >
              {item.location.name}
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
          <LikeIcon style={{ marginRight: 3 }} />
          <Text style={styles.postText}>{item.likes}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={POSTS_DB.Posts.sort(
        (item1, item2) => item2.creationDate - item1.creationDate
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      // extraData={selectedId}
      // refreshing={true}
      style={{
        paddingHorizontal: 16,
        backgroundColor: "white",
      }}
      ListHeaderComponent={
        <View style={styles.userBlock}>
          <Image
            style={styles.userAvatar}
            source={require("../../assets/myAvatar.jpg")}
          />
          <View>
            <Text style={styles.userBlockLogin}>TopTester1337</Text>
            <Text style={styles.userBlockEmail}>qwerty228@gmail.com</Text>
          </View>
        </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  userBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
  },
  userAvatar: { height: 80, width: 80, borderRadius: 16, marginRight: 8 },
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
