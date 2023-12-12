import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/base";
import ButtonComponent from "./Auth/LocalComponents/ButtonComponent";
import Api from "../core/service/Api";

interface ValidatieValueProps {
  status: boolean;
  message?: string;
}

const Register = (props: any) => {
  const [secureTextEntryValue, setSecureTextEntryValue] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordValid, setPasswordValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });
  const [emailValid, setEmailValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });

  const [userNameValid, setUserNameValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });

  const validateUserName = (UserNameValue: string) => {
    const r = {
      status: UserNameValue.length >= 1,
      message: "UserName must be at least 1 characters",
    };
    setUserNameValid(r);
  };

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
  const [passwordConfirmationValue, setPasswordConfirmationValue] =
    useState("");
  const [passwordConfirmationValid, setPasswordConfirmationValid] =
    useState<ValidatieValueProps>({
      status: false,
      message: "",
    });
  const validatePasswordConfirmation = (passwordConfirmationValue: string) => {
    const r = {
      status: passwordConfirmationValue === passwordValue,
      message: "Password confirmatiom must same as password",
    };
    setPasswordConfirmationValid(r);
  };

  const validateFormValue = () => {
    validateUserName(userNameValue);
    validateEmail(emailValue);
    validatePassword(passwordValue);
    validatePasswordConfirmation(passwordConfirmationValue);
  };
  const handlerSubmit = () => {
    validateFormValue();
    const Register = async () => {
      setLoading(true);
      const body = {
        username: userNameValue,
        email: emailValue,
        password: passwordValue,
      };
      const api = new Api();
      api.url = "user/register";
      api.mode = "crm";
      api.body = body;
      const resp = await api.call();

      if (resp?.statusCode != 200) {
        Alert.alert(
          "An Error Occurred",
          "An unexpected error has occurred. Please try again.",
          [
            {
              text: String("OK"),
            },
          ]
        );
        setLoading(false);
      } else {
        props.navigation.replace("Login");
        setLoading(false);
      }
    };
    Register();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPress={() => props.navigation.goBack()}
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
        <Text style={styles.textsingup}>Sign Up</Text>
        <Text style={styles.textDescription}>Hello, let's join with us</Text>
        <View style={{ paddingVertical: 30 }}>
          {/* name */}
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <Icon
                  name="user-alt"
                  size={20}
                  color="#26E467"
                  type="font-awesome-5"
                />
                <TextInput
                  placeholder="Nama"
                  onChangeText={(value) => setUserNameValue(value)}
                  style={styles.inputText}
                />
              </View>
            </View>
            {!userNameValid?.status && (
              <Text style={styles.errorText}>{userNameValid?.message}</Text>
            )}
          </View>

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

          {/* password confirmation */}
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <Icon
                  name="lock-clock"
                  type="MaterialIcons"
                  size={20}
                  color="#26E467"
                />
                <TextInput
                  placeholder="Confirm Password"
                  onChangeText={(value) => setPasswordConfirmationValue(value)}
                  secureTextEntry={secureTextEntryValue}
                  style={styles.inputText}
                />
              </View>
            </View>
            {!passwordConfirmationValid?.status && (
              <Text style={styles.errorText}>
                {passwordConfirmationValid?.message}
              </Text>
            )}
          </View>
        </View>
        <ButtonComponent label="Register Now" action={handlerSubmit} />

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
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: "#ED4C4C" }}>
              Login now{" "}
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
export default Register;
