import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import Home from "../Nested/Home";
import Comments from "../Nested/Comments";
import Map from "../Nested/Map";
import { LogoutIcon } from "../../shared/SvgComponents";

const Nested = createStackNavigator();
const Posts = () => {
  return (
    <Nested.Navigator initialRouteName="Home" backBehavior="history">
      <Nested.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Posts",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerStyle: {
            height: 80,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontFamily: "RobotoMedium",
          },
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
      <Nested.Screen name="Comments" component={Comments} />
      <Nested.Screen name="Map" component={Map} />
    </Nested.Navigator>
  );
};

export default Posts;
