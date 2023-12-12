import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";

interface OverlayLoadingProps {
  isVisible: boolean;
}

const OverlayLoading = ({ isVisible }: OverlayLoadingProps) => {
  return (
    <Modal transparent={true} animationType={"none"} visible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={isVisible} />
        </View>
      </View>
    </Modal>
  );
};

export default OverlayLoading;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
