import { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import dateParser from "../../shared/hooks/dateParser";
import { CommentIcon, LikeIcon, LogoutIcon } from "../../shared/SvgComponents";
import MapPinIcon from "../../shared/SvgComponents/MapPinIcon";
import AddAvatarIcon from "../../shared/SvgComponents/AddAvatarIcon";

import POSTS_DB from "../../shared/posts.json";

const Profile = ({ navigation }) => {
  const [isImageSet, setIsImageSet] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginBottom: 35,
          // height: 362,
          paddingHorizontal: 16,
          backgroundColor: "white",
        }}
      >
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
            <CommentIcon style={{ marginRight: 0 }} />
            <Text style={styles.postText}>
              &nbsp;&#8210;&nbsp;{item.comments.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postButton}
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("Map", {
                location: item.location.coords,
                title: item.postName,
                description: item.location.name,
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
          <LikeIcon />
          <Text style={styles.postText}>&nbsp;&#8210;&nbsp;{item.likes}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ height: "100%", marginTop: "auto" }}>
      <ImageBackground
        style={{ height: "100%", zIndex: -1 }}
        source={require("../../assets/background.png")}
      >
        <FlatList
          style={{
            height: "100%",
            backgroundColor: "white",
            marginTop: 200,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          data={POSTS_DB.Posts.sort(
            (item1, item2) => item2.creationDate - item1.creationDate
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.listHeaderBlock}>
              <TouchableOpacity
                style={styles.userAvatarBlock}
                activeOpacity={0.9}
                onPress={() => setIsImageSet(!isImageSet)}
              >
                {isImageSet ? (
                  <>
                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: 16,
                      }}
                      source={require("../../assets/myAvatar.jpg")}
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
              <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.6}>
                <LogoutIcon />
              </TouchableOpacity>
              <Text style={styles.userName}>Nazar Karpeko</Text>
            </View>
          }
        />
      </ImageBackground>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backgroundImg: {
    height: "100%",
    // paddingTop:300
  },

  listHeaderBlock: {
    // marginTop: 200,
    backgroundColor: "white",
    height: 160,
    // width: "100%",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
  },

  userAvatarBlock: {
    position: "absolute",
    top: 0,
    // left: "50%",
    right: "50%",
    transform: [{ translateX: 50 }, { translateY: -50 }],
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
    // marginBottom: 33,
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
