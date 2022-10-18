import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostsScreen from "../../Screens/Main/Posts/Posts";
import CreatePost from "../../Screens/Main/CreatePost/CreatePost";
import Profile from "../../Screens/Main/Profile/Profile";

import {
  PostsIcon,
  PostsIconFocused,
  CreatePostIcon,
  ProfileIcon,
  ProfileIconFocused,
  GoBackIcon,
  LogoutIcon,
} from "../SvgComponents";

const MainTabs = createBottomTabNavigator();
const MainNavigation = () => {
  return (
    <MainTabs.Navigator
      initialRouteName="PostsScreen"
      backBehavior="history"
      screenOptions={{ tabBarStyle: { borderTopWidth: 1 } }}
    >
      <MainTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
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
          tabBarIcon: ({ focused }) =>
            focused ? <PostsIconFocused /> : <PostsIcon />,
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
      <MainTabs.Screen
        name="CreatePost"
        component={CreatePost}
        options={({ navigation }) => {
          return {
            headerTitle: "Create Post",
            tabBarShowLabel: false,
            headerTitleAlign: "center",
            freezeOnBlur: true,
            headerStyle: {
              height: 80,
              borderBottomWidth: 1,
            },
            headerTitleStyle: {
              fontFamily: "RobotoMedium",
            },
            tabBarIcon: () => <CreatePostIcon />,
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
          };
        }}
      />
      <MainTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: "Profile",
          tabBarShowLabel: false,
          headerTitleAlign: "center",
          headerShown: false,
          headerStyle: {
            height: 80,
          },
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileIconFocused /> : <ProfileIcon />,
        }}
      />
    </MainTabs.Navigator>
  );
};

export default MainNavigation;
