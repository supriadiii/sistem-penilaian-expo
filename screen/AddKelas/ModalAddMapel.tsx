import { Alert, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import ButtonComponent from "../Auth/LocalComponents/ButtonComponent";
import Api from "../../core/service/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useExpoUserGlobal } from "../../core/hooks/GlobalState";
import { createMataPelajaran } from "../../core/service/SistemPenilaian";

interface ValidatieValueProps {
  status: boolean;
  message?: string;
}
const ModalAddMapel = ({ idKelas, showAddMapel, setShowAddMapel }: any) => {
  const [user, setUser] = useExpoUserGlobal();
  const [loading, setLoading] = useState(false);
  const [mapelValue, setmapelValue] = useState("");
  const [mapelValid, setmapelValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });
  const [guruMapelValue, setguruMapelValue] = useState("");
  const [guruMapelValid, setguruMapelValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });

  const validatemapel = (mapelValue: string) => {
    const r = {
      status: mapelValue.length >= 1,
      message: "Mata Pelajaran must be at least 1 characters",
    };
    setmapelValid(r);
  };
  const validateguruMapel = (guruMapelValue: string) => {
    const r = {
      status: guruMapelValue.length >= 1,
      message: "Guru Mapel must be at least 1 characters",
    };
    setguruMapelValid(r);
  };

  const validateFormValue = () => {
    validatemapel(mapelValue);
    validateguruMapel(guruMapelValue);
  };

  const handleSubmit = async () => {
    validateFormValue();
    const CreateAddMapel = async () => {
      setLoading(true);
      const body = {
        nama: mapelValue,
        guruMapel: guruMapelValue,
        kelasId: idKelas,
      };
      const resp = await createMataPelajaran(body);
      console.log(resp, "[[[[[]]");
      console.log(body, "[[[[[]]");
      if (resp?.statusCode == 200) {
        setShowAddMapel(false);
      } else {
        Alert.alert("Terjadi kesalahan", "Silahkan priksa kembali data anda");
      }
    };
    CreateAddMapel();
  };
  return (
    <Modal
      animationType="slide"
      statusBarTranslucent
      transparent={true}
      style={styles.centeredView}
      visible={showAddMapel}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setShowAddMapel(!showAddMapel);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              paddingBottom: 10,
            }}
          >
            Masukan Nama Mata Pelajaran
          </Text>
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <TextInput
                  placeholder="Nama Mata pelajaran"
                  onChangeText={(value) => setmapelValue(value)}
                  style={styles.inputText}
                />
              </View>
            </View>
            {!mapelValid?.status && (
              <Text style={styles.errorText}>{mapelValid?.message}</Text>
            )}
          </View>
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <TextInput
                  placeholder="Nama Guru Mata pelajaran"
                  onChangeText={(value) => setguruMapelValue(value)}
                  style={styles.inputText}
                />
              </View>
            </View>
            {!guruMapelValid?.status && (
              <Text style={styles.errorText}>{guruMapelValid?.message}</Text>
            )}
          </View>

          <ButtonComponent label="Submit" action={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddMapel;
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 32,
    paddingVertical: 80,
  },
  modalView: {
    backgroundColor: "#C1F2B0",
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 70,
    shadowColor: "#000",
    maxHeight: "100%",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 80,
  },
});
