import Svg, { Path } from "react-native-svg";

const MapPinIcon = ({ style, fill }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style} fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 10.3636C20 16.0909 12 21 12 21C12 21 4 16.0909 4 10.3636C4 6.29681 7.58172 3 12 3C16.4183 3 20 6.29681 20 10.3636V10.3636Z"
        stroke={fill || "#BDBDBD"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
        stroke={fill || "#BDBDBD"}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default MapPinIcon;
