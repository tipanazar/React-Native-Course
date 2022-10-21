import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import Home from "../Nested/Home";
import Comments from "../../shared/Components/Comments";
import Map from "../../shared/Components/Map";
import { LogoutIcon, GoBackIcon } from "../../shared/SvgComponents";

const PostsScreen = createStackNavigator();
const Posts = () => {
  return (
    <PostsScreen.Navigator
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
      <PostsScreen.Screen
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
      <PostsScreen.Screen
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
      <PostsScreen.Screen
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
    </PostsScreen.Navigator>
  );
};

export default Posts;
