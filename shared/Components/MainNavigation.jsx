import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Posts from "../../Screens/Main/Posts";
import CreatePost from "../../Screens/Main/CreatePost";
import Profile from "../../Screens/Main/Profile";

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
  // console.log(<Posts/>)

  return (
    <MainTabs.Navigator
      initialRouteName="PostsScreen"
      backBehavior="history"
      screenOptions={{
        tabBarStyle: { borderTopWidth: 1 },
        headerStyle: {
          height: 80,
          borderBottomWidth: 1,
        },
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <MainTabs.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <PostsIconFocused /> : <PostsIcon />,
        }}
      />
      <MainTabs.Screen
        name="CreatePost"
        component={CreatePost}
        options={({ navigation }) => {
          return {
            headerTitle: "Create Post",
            freezeOnBlur: true,
            headerShown: true,
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
          tabBarIcon: ({ focused }) =>
            focused ? <ProfileIconFocused /> : <ProfileIcon />,
        }}
      />
    </MainTabs.Navigator>
  );
};

export default MainNavigation;
