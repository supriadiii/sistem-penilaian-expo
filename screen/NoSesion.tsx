import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";

const NoSesion = (props: any) => {
  console.log(props, "----");
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/ilustrator/loginandregis.png")}
      />
      <TouchableOpacity
        style={styles.bacgred}
        onPress={() => props.navigation.navigate("Login")}
      >
        <Text style={styles.textButton}>{"Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bacgred}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={styles.textButton}>{"Register"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#26E467",
    justifyContent: "center",
    alignItems: "center",
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
  textButton: {
    // color: "#2FD87C",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default NoSesion;
