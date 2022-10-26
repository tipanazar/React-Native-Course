import Spinner from "react-native-loading-spinner-overlay";

const Loader = () => {
  return (
    <Spinner
      visible={true}
      cancelable={false}
      size={70}
      overlayColor="rgba(0, 0, 0, 0.40)"
      color="rgb(255, 198, 0)"
      animation="fade"
    />
  );
};

export default Loader;
