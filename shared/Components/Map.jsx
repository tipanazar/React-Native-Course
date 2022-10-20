import MapView, { Marker } from "react-native-maps";

const Map = ({ route }) => {
  const { location, title, description } = route.params;
  return (
    <MapView
      style={{ height: "100%" }}
      initialRegion={{
        ...location,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker coordinate={location} title={title} description={description} />
    </MapView>
  );
};

export default Map;
