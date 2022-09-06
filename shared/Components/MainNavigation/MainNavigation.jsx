import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../../../Screens/Main/PostsScreen/PostsScreen";
import CreatePost from "../../../Screens/Main/CreatePost/CreatePost";
import Profile from "../../../Screens/Main/Profile/Profile";

import {
  PostsIcon,
  PostsIconFocused,
  CreatePostIcon,
  ProfileIcon,
  ProfileIconFocused,
} from "./SvgComponents";

const MainTabs = createBottomTabNavigator();
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainTabs.Navigator initialRouteName="PostsScreen">
        <MainTabs.Screen
          name="PostsScreen"
          component={PostsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) =>
              focused ? <PostsIconFocused /> : <PostsIcon />,
          }}
        />
        <MainTabs.Screen
          name="CreatePost"
          component={CreatePost}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => <CreatePostIcon />,
          }}
        />
        <MainTabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) =>
              focused ? <ProfileIconFocused /> : <ProfileIcon />,
          }}
        />
      </MainTabs.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
