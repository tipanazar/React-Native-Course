import { Text, View, Image, StyleSheet, ScrollView } from "react-native";

const Posts = () => {
  return (
    <ScrollView style={{ paddingVertical: 25, paddingHorizontal: 16 }}>
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
    </ScrollView>
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
