import { createStackNavigator } from "@react-navigation/stack";

import Registration from "../../Screens/Auth/Registration";
import Login from "../../Screens/Auth/Login";

const AuthNavigation = () => {
  const AuthScreens = createStackNavigator();
  return (
    <AuthScreens.Navigator initialRouteName="Log In">
      <AuthScreens.Screen
        name="Log In"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <AuthScreens.Screen
        name="Sign Up"
        component={Registration}
        options={{
          headerShown: false,
        }}
      />
    </AuthScreens.Navigator>
  );
};

export default AuthNavigation;
