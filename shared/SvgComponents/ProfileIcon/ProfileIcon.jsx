import Svg, { Path } from "react-native-svg";

const ProfileIcon = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40">
      <Path
        d="M28 29v-2c0-2.2091-1.7909-4-4-4h-8c-2.2091 0-4 1.7909-4 4v2"
        stroke="#212121"
        stroke-opacity=".8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 19c2.2091 0 4-1.7909 4-4 0-2.2091-1.7909-4-4-4-2.2091 0-4 1.7909-4 4 0 2.2091 1.7909 4 4 4Z"
        stroke="#212121"
        stroke-opacity=".8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
