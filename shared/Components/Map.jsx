import MapView, { Marker } from "react-native-maps";

const Map = ({ route }) => {
  const { location, title } = route.params;
  return (
    <MapView
      style={{ height: "100%" }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        coordinate={location}
        title={title}
        description={location.locationString}
      />
    </MapView>
  );
};

export default Map;
