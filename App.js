import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
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

  return (
    <View onLayout={onLayoutRootView}>
      <RegistrationScreen />
    </View>
  );
};

export default App;
