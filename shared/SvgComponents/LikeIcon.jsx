import Svg, { Path } from "react-native-svg";

const LikeIcon = ({ style, fill }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 32 32" style={style}>
      <Path
        d="M10 29h13.498c0.829 0 1.502-0.666 1.502-1.5 0-0.828-0.671-1.5-1.502-1.5h-1.498v-1h3.507c0.825 0 1.493-0.666 1.493-1.5 0-0.828-0.664-1.5-1.493-1.5h-2.507v-1h3.507c0.825 0 1.493-0.666 1.493-1.5 0-0.828-0.664-1.5-1.493-1.5h-2.507v-1h3.507c0.825 0 1.493-0.666 1.493-1.5 0-0.828-0.664-1.5-1.493-1.5h-7.207c1.201-5.5 0.852-11-2.3-11-2.871 0-1.063 4.326-2.629 7.301s-4.871 3.699-4.871 3.699h-0.5v15zM4.998 14h4.002v15h-4.002c-1.1 0-1.998-0.892-1.998-1.992v-11.016c0-1.098 0.894-1.992 1.998-1.992zM6 27c0.552 0 1-0.448 1-1s-0.448-1-1-1c-0.552 0-1 0.448-1 1s0.448 1 1 1v0 0z"
        fill={fill}
        stroke={fill || "#FF6C00"}
      />
    </Svg>
  );
};

export default LikeIcon;
