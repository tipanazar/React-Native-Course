import Svg, { Path } from "react-native-svg";

const PostsIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40">
      <Path d="M8 8h24v24H8z" />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 11h7v7h-7v-7ZM22 11h7v7h-7v-7ZM22 22h7v7h-7v-7ZM11 22h7v7h-7v-7Z"
        stroke="#212121"
        stroke-opacity=".8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default PostsIcon;
