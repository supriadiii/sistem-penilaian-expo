import { StatusBar } from "expo-status-bar";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { loginCheck, refreshSession } from "./core/service/SistemPenilaian";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { NavigationContainer } from "@react-navigation/native";
import {
  useExpoTokenGlobal,
  useExpoUserGlobal,
} from "./core/hooks/GlobalState";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./screen/TabNavigation";
import Home from "./screen/Home";
import NoSesion from "./screen/NoSesion";
import Login from "./screen/Login";
import Register from "./screen/Register";
import InputDataSiswa from "./screen/InputDataSiswa";
import MataPelajaran from "./screen/MataPelajaran";

const Stack = createNativeStackNavigator();

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

const fetchFonts = () => {
  return Font.loadAsync({
    Poppins_Black: require("./assets/fonts/Poppins-Black.ttf"),
    Poppins_BlackItalic: require("./assets/fonts/Poppins-BlackItalic.ttf"),
    Poppins_Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Poppins_BoldItalic: require("./assets/fonts/Poppins-BoldItalic.ttf"),
    Poppins_ExtraLight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
    Poppins_ExtraLightItalic: require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
    Poppins_Italic: require("./assets/fonts/Poppins-Italic.ttf"),
    Poppins_Light: require("./assets/fonts/Poppins-Light.ttf"),
    Poppins_LightItalic: require("./assets/fonts/Poppins-LightItalic.ttf"),
    Poppins_Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Poppins_MediumItalic: require("./assets/fonts/Poppins-MediumItalic.ttf"),
    Poppins_Regular: require("./assets/fonts/Poppins-Regular.ttf"),
    Poppins_SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    Poppins_SemiBoldItalic: require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    Poppins_Thin: require("./assets/fonts/Poppins-Thin.ttf"),
    Poppins_ThinItalic: require("./assets/fonts/Poppins-Black.ttf"),
  });
};
export default function App() {
  const [user, setUser] = useExpoUserGlobal();
  const [token, setToken] = useExpoTokenGlobal();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      // Mengambil data pengguna dan token dari AsyncStorage
      const userSessionString = await AsyncStorage.getItem("userData");
      const sessionToken = await AsyncStorage.getItem("session");

      // Mengubah string JSON menjadi objek
      const userSession = userSessionString
        ? JSON.parse(userSessionString)
        : null;

      // Memperbarui state user dan token
      setUser(userSession);
      setToken(sessionToken);

      // Memperbarui state isLoggedIn berdasarkan keberadaan token
      setIsLoggedIn(!!sessionToken && !!userSession);
    };

    checkLoginStatus();
  }, []);

  console.log(token, "Sddsdd");
  const navigationRef: any = useRef();
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    async function loadFontsAndHideSplash() {
      await fetchFonts();
      setFontLoaded(true);
      await SplashScreen.hideAsync();
    }
    loadFontsAndHideSplash();
  }, []);

  if (fontLoaded) {
    return (
      <>
        <StatusBar style="auto" />
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="TabNavigation"
            screenOptions={{ headerShown: false }}
          >
            {token ? (
              <>
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="NoSession" component={NoSesion} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="MataPelajaran" component={MataPelajaran} />

                {/* Tambahkan screen lain yang hanya bisa diakses setelah login */}
              </>
            ) : (
              <>
                <Stack.Screen name="NoSession" component={NoSesion} />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  initialParams={{ itemId: 42 }}
                />

                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                  name="InputDataSiswa"
                  component={InputDataSiswa}
                />
                {/* <Stack.Screen name="TabNavigation" component={TabNavigation} /> */}
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
