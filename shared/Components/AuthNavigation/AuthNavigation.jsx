import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Registration from "../../../Screens/Auth/Registration/Registration";
import Login from "../../../Screens/Auth/Login/Login";

const AuthNavigation = () => {
  const AuthScreens = createStackNavigator();
  return (
    <NavigationContainer>
      <AuthScreens.Navigator initialRouteName="Sign Up">
        <AuthScreens.Screen
          name="Sign Up"
          component={Registration}
          options={{
            headerShown: false,
          }}
        />
        <AuthScreens.Screen
          name="Log In"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </AuthScreens.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
