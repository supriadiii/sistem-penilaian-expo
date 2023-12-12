import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ButtonComponent from "./Auth/LocalComponents/ButtonComponent";
import { Icon } from "@rneui/base";
import Api from "../core/service/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import {
  useExpoTokenGlobal,
  useExpoUserGlobal,
} from "../core/hooks/GlobalState";

interface ValidatieValueProps {
  status: boolean;
  message?: string;
}
const Login = (props: any) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [token, setToken] = useExpoTokenGlobal();
  const [user, setUser] = useExpoUserGlobal();

  const [secureTextEntryValue, setSecureTextEntryValue] = useState(true);
  //   console.log("props", props);
  const [passwordValid, setPasswordValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });
  const [emailValid, setEmailValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });

  const validateEmail = (email: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const r = {
      status: pattern.test(emailValue),
      message: "Please enter a valid email",
    };
    setEmailValid(r);
  };

  const validatePassword = (passwordValue: string) => {
    const r = {
      status: passwordValue.length >= 6,
      message: "Password must be at least 6 characters",
    };
    setPasswordValid(r);
  };

  const validateFormValue = () => {
    validateEmail(emailValue);
    validatePassword(passwordValue);
  };

  const handleLogin = async () => {
    try {
      validateFormValue();
      if (!emailValid.status || !passwordValid.status) {
        Alert.alert("Validation Error", "Please check your email and password");
        return;
      }

      setLoading(true);
      const body = { email: emailValue, password: passwordValue };

      const api = new Api();
      api.url = "user/login";
      api.mode = "crm";
      api.body = body;
      console.log("body", body);
      const resp = await api.call();
      console.log("ini adalah respon", resp);
      //   console.log("AccessToken:", resp?.data?.accessToken);

      if (resp?.statusCode != 200) {
        Alert.alert("Login failed", "Please check your email and password");
      } else {
        const userData = resp?.data?.user;
        userData.status = "login";
        userData.accessToken = resp?.data?.accessToken;
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        await AsyncStorage.setItem("session", userData.accessToken);
        setToken(userData.accessToken);
        setUser(userData);
        props.navigation.replace("TabNavigation");
        // onLoginSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Error", "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        // onPress={() => props.navigation.goBack()}
      >
        <Icon
          style={styles.iconBack}
          name="chevron-left"
          type="font-awesome-5"
          color={"white"}
        ></Icon>
        <Text style={styles.textBack}>Back</Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingHorizontal: 40,
        }}
      >
        <Text style={styles.textsingup}>Sign In</Text>
        <Text style={styles.textDescription}>Hello, let's join with us</Text>
        <View style={{ paddingVertical: 30 }}>
          {/* email */}
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <Icon name="mail" size={20} color="#26E467" />
                <TextInput
                  placeholder="Email Address"
                  onChangeText={(value) => setEmailValue(value)}
                  style={styles.inputText}
                />
              </View>
            </View>
            {!emailValid?.status && (
              <Text style={styles.errorText}>{emailValid?.message}</Text>
            )}
          </View>

          {/* password */}
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <Icon
                  name="lock"
                  type="materialicons"
                  size={20}
                  color="#26E467"
                />
                <TextInput
                  placeholder="Password"
                  onChangeText={(value) => setPasswordValue(value)}
                  style={styles.inputText}
                  secureTextEntry={secureTextEntryValue}
                />
                <TouchableOpacity
                  onPress={() => setSecureTextEntryValue(!secureTextEntryValue)}
                >
                  {secureTextEntryValue ? (
                    <Icon name="eye" type="feather" size={20} color="#26E467" />
                  ) : (
                    <Icon
                      name="eye-off"
                      type="feather"
                      size={20}
                      color="#26E467"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {!passwordValid?.status && (
              <Text style={styles.errorText}>{passwordValid?.message}</Text>
            )}
          </View>
        </View>
        <ButtonComponent label="Login" action={handleLogin} />

        <View
          style={{
            flexDirection: "row",
            paddingTop: 40,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "700", color: "white" }}>
            Don’t have an Account ?{" "}
          </Text>
          <TouchableOpacity
          // onPress={() => props.navigation.navigate("Register")}
          >
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#ED4C4C" }}>
              Register Now{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBack: {
    textAlignVertical: "center",
    color: "white",
    fontWeight: "800",
    fontSize: 20,
  },
  textsingup: {
    fontSize: 40,
    color: "white",
    fontWeight: "700",
  },
  container: {
    flex: 1,
    backgroundColor: "#26E467",
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 50,
    gap: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
  bacgred: {
    backgroundColor: "#ffffff",
    padding: 16,
    // flex: 1,
    borderRadius: 15,
    width: 200,
  },
  textDescription: {
    color: "#ffff",
    fontSize: 16,
  },

  inputContent: { justifyContent: "center", flexDirection: "row" },
  inputSubContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 10,
  },
  inputTwoSubContent: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#959595",
    width: "49%",
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  errorText: { color: "red", fontSize: 12 },
});
export default Login;
