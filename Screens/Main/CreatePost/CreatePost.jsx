import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import TakePhoto from "../../../shared/Components/TakePhoto";


const CreatePost = () => {
  return (
    <View style={styles.mainBlock}>
      <TakePhoto mainBlockStyle={styles.takePhotoBlock} />
      <View style={styles.form}>
        <TextInput placeholder="Name" />
        <TextInput placeholder="Location" />
        <TouchableOpacity>
          <Text>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  mainBlock: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  takePhotoBlock: {
    height: 267,
    marginBottom: 33
  },
});
