import { Alert, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import ButtonComponent from "../Auth/LocalComponents/ButtonComponent";
import Api from "../../core/service/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useExpoUserGlobal } from "../../core/hooks/GlobalState";
import { createKelas } from "../../core/service/SistemPenilaian";

interface ValidatieValueProps {
  status: boolean;
  message?: string;
}
const ModalAddKelas = ({ showModalAddKelas, setShowModalAddKelas }: any) => {
  const [user, setUser] = useExpoUserGlobal();
  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [nameValid, setNameValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });
  const [WaliKelasValue, setWaliKelasValue] = useState("");
  const [WaliKelasValid, setWaliKelasValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });

  const validateName = (NameValue: string) => {
    const r = {
      status: NameValue.length >= 1,
      message: "UserName must be at least 1 characters",
    };
    setNameValid(r);
  };
  const validateWaliKelas = (WaliKelasValue: string) => {
    const r = {
      status: WaliKelasValue.length >= 1,
      message: "WaliKelas must be at least 1 characters",
    };
    setWaliKelasValid(r);
  };

  const validateFormValue = () => {
    validateName(nameValue);
    validateWaliKelas(WaliKelasValue);
  };

  const handleSubmit = async () => {
    validateFormValue();
    const CreateAddKelas = async () => {
      const token = await AsyncStorage.getItem("session");

      setLoading(true);
      const body = {
        nama: nameValue,
        waliKelas: WaliKelasValue,
      };
      const resp = await createKelas(body);
      console.log(resp, "[[[[[]]");
      console.log(body, "[[[[[]]");
      if (resp?.statusCode == 200) {
        setShowModalAddKelas(false);
      } else {
        Alert.alert("Terjadi kesalahan", "Silahkan priksa kembali data anda");
      }
    };
    CreateAddKelas();
  };
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent={true}
      style={styles.centeredView}
      visible={showModalAddKelas}
      onRequestClose={() => {
        setShowModalAddKelas(!showModalAddKelas);
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
            Masukan Data AddKelas
          </Text>
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <TextInput
                  placeholder="Nama Kelas"
                  onChangeText={(value) => setNameValue(value)}
                  style={styles.inputText}
                />
              </View>
            </View>
            {!nameValid?.status && (
              <Text style={styles.errorText}>{nameValid?.message}</Text>
            )}
          </View>
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <TextInput
                  placeholder="WaliKelas(Nomor Identitas Pegawai Negeri Sipil )"
                  onChangeText={(value) => setWaliKelasValue(value)}
                  style={styles.inputText}
                />
              </View>
            </View>
            {!nameValid?.status && (
              <Text style={styles.errorText}>{nameValid?.message}</Text>
            )}
          </View>
          <ButtonComponent label="Submit" action={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddKelas;
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
