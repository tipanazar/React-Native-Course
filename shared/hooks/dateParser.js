import { Platform } from "react-native";

const dateParser = (date) => {
  if (Platform.OS === "android") {
    const dateArr = new Date(date).toLocaleDateString().split("/");
    dateArr.splice(2, 1, "2022");
    const slicedDate = dateArr.slice(1, 3);
    slicedDate.splice(1, 0, dateArr[0]);
    return slicedDate.join(".");
  }
  return new Date(date).toLocaleDateString();
};

export default dateParser;
