import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { CameraIcon } from "../SvgComponents";

const TakePhoto = ({ mainBlockStyle }) => {
  const isFocused = useIsFocused();

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [img, setImg] = useState({ uri: "", id: "" });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  });

  const getPic = async () => {
    const album = await MediaLibrary.getAlbumAsync("OnlineGallery");
    if (!album) {
      const { uri } = await cameraRef.takePictureAsync();
      const newPic = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("OnlineGallery", newPic.id);
      setImg({ uri: newPic.uri, id: newPic.id });
      return;
    }
    const { uri } = await cameraRef.takePictureAsync();
    const newPic = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.addAssetsToAlbumAsync([newPic.id], album.id);
    setImg({ uri: newPic.uri, id: newPic.id });
  };

  return (
    <View style={mainBlockStyle}>
      <TouchableOpacity
        style={styles.cameraBlock}
        onPress={async () => {
          if (cameraRef) {
            await getPic();
          }
          if (img.uri.length) {
            await MediaLibrary.deleteAssetsAsync([img.id]);
            setImg({ uri: "", id: "" });
          }
        }}
      >
        {img.uri.length ? (
          <Image source={{ uri: img.uri }} style={styles.camera} />
        ) : isFocused ? (
          <Camera
            type="back"
            flashMode="auto"
            ref={(ref) => setCameraRef(ref)}
            style={styles.camera}
          />
        ) : (
          <></>
        )}
        <View
          style={{
            ...styles.cameraIconBlock,
            backgroundColor: hasPermission && "#FFFFFF4D",
          }}
        >
          <CameraIcon fill={hasPermission && "#fff"} />
        </View>
      </TouchableOpacity>
      <Text style={styles.cameraBlockTitle}>
        {hasPermission === true
          ? img.id.length
            ? "Remove Photo"
            : "Take a Photo"
          : "Importing photos requires access to your camera and device storage."}
      </Text>
    </View>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({
  cameraBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d4cfcf",
    marginBottom: 8,
    height: 260,
  },
  cameraIconBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: "white",
  },
  cameraBlockTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontFamily: "RobotoRegular",
  },

  camera: {
    borderRadius: 7,
    height: "100%",
    width: "100%",
  },
});
