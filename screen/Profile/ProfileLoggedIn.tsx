import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "@rneui/themed";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import {
  useExpoTokenGlobal,
  useExpoUserGlobal,
} from "../../core/hooks/GlobalState";
const ProfileLoggedIn = (props: any) => {
  const [user, setUser] = useExpoUserGlobal();
  const [token, setToken] = useExpoTokenGlobal();

  console.log("Profi", props);
  const logout = async () => {
    setUser({
      status: "logout",
      profile_photo_path: "",
      first_name: "",
      last_name: "",
    });
    await AsyncStorage.removeItem("userData");
    await AsyncStorage.removeItem("session");
    setToken(null);
    props.props.props.navigation.replace("NoSession");
  };
  return (
    <View style={styles.Container}>
      <View style={styles.containerHeader}>
        <Text style={styles.MyAccount}>{"My Account"}</Text>
        {/* <Image source={require("../../../assets/img/profile/profile.png")} style={styles.Image} /> */}
        <View style={styles.ImageContainer}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`,
            }}
            style={styles.Image}
          />
        </View>
        <Text style={styles.NameAccount}>
          {user.title}
          {user.title !== "" && user.title !== null ? "." : ""} {user.firstName}{" "}
          {user.lastName}
        </Text>
      </View>

      <ScrollView style={styles.containerContent}>
        <TouchableOpacity
          onPress={() => props.props.props.navigation.navigate("MyAccount")}
        >
          <View style={styles.containerListClass}>
            <Icon
              name="account"
              type="material-community"
              size={20}
              color={"#1e293b"}
            ></Icon>
            <Text style={styles.textList}>{"My Account"}</Text>
            <View style={styles.containerChevron}>
              <Icon
                name="navigate-next"
                type="material"
                color={"#1e293b"}
              ></Icon>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.props.props.navigation.navigate("Security")}
        >
          <View style={styles.containerListClass}>
            <Icon name="lock" type="font--5" size={20} color={"#1e293b"}></Icon>
            <Text style={styles.textList}>{"Security"}</Text>
            <View style={styles.containerChevron}>
              <Icon
                name="navigate-next"
                type="material"
                color={"#1e293b"}
              ></Icon>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => logout()}>
          <View style={styles.containerListClass}>
            <Icon
              name="logout"
              type="material-community"
              size={20}
              color={"#1e293b"}
            ></Icon>
            <Text style={styles.textList}>{"Log Out"}</Text>
            <View style={styles.containerChevron}>
              <Icon
                name="navigate-next"
                type="material"
                color={"#1e293b"}
              ></Icon>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export const styles = StyleSheet.create({
  containerChevron: {
    flexDirection: "row",
  },
  textList: {
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "500",
    flex: 1,
  },
  containerListClass: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 45,
    paddingTop: 40,
    gap: 20,
  },
  containerContent: {
    flex: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
  },
  NameAccount: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  ImageContainer: {
    width: 63,
    height: 63,
    borderRadius: 63 / 2,
    overflow: "hidden",
  },
  Image: {
    height: 63,
    width: 63,
    borderRadius: 999,
    backgroundColor: "#6B7280",
  },
  MyAccount: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  containerHeader: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  Container: {
    flex: 1,
    fontFamily: "Poppins_Regular",
    backgroundColor: "#ef4444",
  },
});
export default ProfileLoggedIn;
