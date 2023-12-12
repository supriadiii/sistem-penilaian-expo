import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonComponentProps {
  label?: string; // Optional label prop to customize button text
  action: () => void; // Type for the action prop
}

function ButtonComponent({ label, action }: ButtonComponentProps) {
  const buttonStyle =
    label === "Tambah Kelas" || "Tambah Element Pembelajaran"
      ? styles.content2
      : styles.content;
  return (
    <TouchableOpacity onPress={action}>
      <View style={styles.contaner}>
        <View style={buttonStyle}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flexDirection: "row",
    // paddingTop: 70,
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  content2: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#65B741",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ButtonComponent;
