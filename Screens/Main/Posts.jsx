import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import Home from "../Nested/Home";
import Comments from "../../shared/Components/Comments";
import Map from "../../shared/Components/Map";
import { LogoutIcon, GoBackIcon } from "../../shared/SvgComponents";

const Nested = createStackNavigator();
const Posts = () => {
  return (
    <Nested.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        headerStyle: {
          height: 80,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: "RobotoMedium",
          fontSize: 17,
        },
        headerTitleAlign: "center",
      }}
    >
      <Nested.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Posts",
          headerRight: () => (
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "30%",
              }}
              onPress={() => console.log("logout")}
            >
              <LogoutIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <Nested.Screen
        name="Comments"
        component={Comments}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "40%",
              }}
              onPress={() => navigation.goBack()}
            >
              <GoBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Nested.Screen
        name="Map"
        component={Map}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "40%",
              }}
              onPress={() => navigation.goBack()}
            >
              <GoBackIcon />
            </TouchableOpacity>
          ),
        })}
      />
    </Nested.Navigator>
  );
};

export default Posts;
