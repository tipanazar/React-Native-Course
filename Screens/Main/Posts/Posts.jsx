import { Text, View, Image, StyleSheet, FlatList } from "react-native";

import POSTS_DB from "./posts.json";

const Posts = () => {
  //

  const renderItem = ({ item }) => {
    return (
      <View style={styles.postBlock}>
        <Image
          style={styles.postImage}
          source={{
            uri: item.photoAddress,
          }}
        />
        <Text style={styles.postText}>{item.postName}</Text>
        <Text style={styles.postText}>{item.creationDate}</Text>
        <Text style={styles.postText}>{item.comments.length}</Text>
        <Text style={styles.postText}>{item.likes}</Text>
        <Text style={styles.postText}>{item.location.text}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={{ paddingVertical: 25, paddingHorizontal: 16 }}
      ListHeaderComponent={
        <View style={styles.userBlock}>
          <Image
            style={styles.userAvatar}
            source={require("../../../assets/myAvatar.jpg")}
          />
          <View>
            <Text style={styles.userBlockLogin}>TopTester1337</Text>
            <Text style={styles.userBlockEmail}>qwerty228@gmail.com</Text>
          </View>
        </View>
      }
      data={POSTS_DB.Posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      // extraData={selectedId}
    ></FlatList>
  );
};
export default Posts;

const styles = StyleSheet.create({
  userBlock: { display: "flex", flexDirection: "row", alignItems: "center" },
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

  postImage: {
    height: 240,
    borderRadius: 8,
    width: "100%",
  },
});
