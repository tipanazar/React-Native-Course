import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfile from "../Nested/UserProfile";
import Comments from "../../shared/Components/Comments";
import Map from "../../shared/Components/Map";
import { GoBackIcon } from "../../shared/SvgComponents";

const ProfileScreen = createStackNavigator();
const Profile = () => {
  return (
    <ProfileScreen.Navigator
      initialRouteName="UserProfile"
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
      <ProfileScreen.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitle: "UserProfile",
          headerShown: false,
        }}
      />
      <ProfileScreen.Screen
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
      <ProfileScreen.Screen
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
    </ProfileScreen.Navigator>
  );
};

export default Profile;
