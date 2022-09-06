import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { CameraIcon } from "../SvgComponents";

const TakePhoto = ({ mainBlockStyle }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  console.log(hasPermission);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  });

  return (
    <View style={mainBlockStyle}>
      <TouchableOpacity style={styles.cameraBlock}>
        <Camera type={cameraType} ref={(ref) => setCameraRef(ref)}>
        <View style={styles.cameraIconBlock}>
          <CameraIcon />
        </View>

        </Camera>
      </TouchableOpacity>
      {hasPermission === true ? (
        <Text style={styles.cameraBlockTitle}>Upload Photos.</Text>
      ) : (
        <Text style={styles.cameraBlockTitle}>
          Importing photos requires access to your camera and device storage.
        </Text>
      )}
    </View>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({
  cameraBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    marginBottom: 8,
  },
  cameraIconBlock: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: "white",
  },
  cameraBlockTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
});
