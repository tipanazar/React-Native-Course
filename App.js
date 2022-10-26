import { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { store } from "./redux/store";

import Main from "./Main";

SplashScreen.preventAutoHideAsync();
const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
          RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
          RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
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
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={{ height: "100%" }}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </View>
    </Provider>
  );
};

export default App;
