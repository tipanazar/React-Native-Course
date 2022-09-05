import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
          RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
        });
        const images = [
          require("./assets/background.png"),
          require("./assets/myAvatar.jpg"),
        ];
        const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });

        await Promise.all(cacheImages);
      } catch (err) {
        console.warn(err);
      } finally {
        setIsReady(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  const MainStack = createStackNavigator();
  return (
    <NavigationContainer>
      <View onLayout={onLayoutRootView} style={{ height: "100%" }}>
        <MainStack.Navigator initialRouteName="Sign Up">
          <MainStack.Screen
            name="Sign Up"
            component={RegistrationScreen}
            options={{
              headerShown: false,
            }}
          />
          <MainStack.Screen
            name="Log In"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default App;
