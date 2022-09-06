import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import AuthNavigation from "./shared/Components/AuthNavigation/AuthNavigation";
import MainNavigation from "./shared/Components/MainNavigation/MainNavigation";
import Home from "./Screens/Home";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

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

  if (!isAuth) {
    return (
      <View onLayout={onLayoutRootView} style={{ height: "100%" }}>
        <AuthNavigation />
      </View>
    );
  }

  return (
    <View onLayout={onLayoutRootView} style={{ height: "100%" }}>
      <Home />
    </View>
  );
};

export default App;
