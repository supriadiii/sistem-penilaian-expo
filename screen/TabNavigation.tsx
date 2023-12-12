import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Home from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useExpoUserGlobal } from "../core/hooks/GlobalState";
import Login from "./Login";
import Profile from "./Profile";
import NoSesion from "./NoSesion";
import Kelas from "./Kelas";

const TabNavigation = (props: any) => {
  const [user] = useExpoUserGlobal();
  console.log(user);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 25,
          backgroundColor: "#ffffff",
          borderRadius: 16,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
          ...style.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <Home props={props} />}
        options={{
          tabBarIcon: HomeMenu,
        }}
      />
      {user?.role === "GURU" && (
        <Tab.Screen
          name="Kelas"
          children={() =>
            user?.status === "logout" ? (
              <NoSesion props={props} />
            ) : (
              <Kelas props={props} />
            )
          }
          options={{
            tabBarIcon: KelasMenu,
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        children={() =>
          user?.status === "logout" ? (
            <NoSesion props={props} />
          ) : (
            <Profile props={props} />
          )
        }
        options={{
          tabBarIcon: ProfileMenu,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const HomeMenu = ({ focused }: any) => {
  return (
    <View style={style.viewStyle}>
      <Icon
        name="home"
        type="antdesign"
        size={25}
        color={focused ? "#163020" : "#D6D6D6"}
      />
      <Text style={focused ? style.textFocus : style.textNoFocus}>HOME</Text>
    </View>
  );
};

const ProfileMenu = ({ focused }: any) => {
  const [user, setUser] = useExpoUserGlobal();
  if (user === "") {
    setUser({
      status: "logout",
      profile_photo_path: "",
      first_name: "",
      last_name: "",
    });
  }

  return (
    <View style={style.viewStyle}>
      {user?.status === "logout" ? (
        <Icon
          name="login"
          type="material-icons-outlined"
          size={25}
          color={focused ? "#163020" : "#D6D6D6"}
        />
      ) : (
        <Icon
          name="person-outline"
          type="material-icons-outlined"
          size={25}
          color={focused ? "#163020" : "#D6D6D6"}
        />
      )}
      <Text style={focused ? style.textFocus : style.textNoFocus}>
        {" "}
        {user?.status === "logout" ? "LOGIN" : "PROFILE"}
      </Text>
    </View>
  );
};

const KelasMenu = ({ focused }: any) => {
  const [user, setUser] = useExpoUserGlobal();
  if (user === "") {
    setUser({
      status: "logout",
      profile_photo_path: "",
      first_name: "",
      last_name: "",
    });
  }

  return (
    <View style={style.viewStyle}>
      {user?.status === "logout" ? (
        <Icon
          name="login"
          type="material-icons-outlined"
          size={25}
          color={focused ? "#163020" : "#D6D6D6"}
        />
      ) : (
        <Icon
          name="school"
          type="material-icons-outlined"
          size={25}
          color={focused ? "#163020" : "#D6D6D6"}
        />
      )}
      <Text style={focused ? style.textFocus : style.textNoFocus}>
        {" "}
        {user?.status === "logout" ? "LOGIN" : "KELAS"}
      </Text>
    </View>
  );
};
const style = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  viewStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
  },
  textFocus: {
    paddingTop: 4,
    fontSize: 8,
    color: "#163020",
  },
  textNoFocus: {
    paddingTop: 4,
    fontSize: 8,
    color: "#D6D6D6",
  },
});
