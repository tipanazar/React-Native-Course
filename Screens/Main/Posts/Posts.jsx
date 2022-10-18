import { Text, View, Image, StyleSheet, FlatList } from "react-native";

import * as Location from "expo-location";

import POSTS_DB from "./posts.json";

const Posts = () => {
  //
  
  const renderItem = async({ item }) => {
    let locationString = "";
    const location = await Location.reverseGeocodeAsync({
      longitude: item.coords.longitude,
      latitude: item.coords.latitude,
    });
    locationString = `${location.street}, ${location.city}, ${location.country}`;

    console.log(locationString);
    return (
      <View>
        <Image source={item.photoAddress} />
        <Text>{item.postName}</Text>
        <Text>{item.creationDate}</Text>
        <Text>{item.comments.length}</Text>
        {/* <Text>{`${location.street}, ${location.city}, ${location.country}`}</Text> */}
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
});
