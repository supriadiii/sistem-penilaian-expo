import { Alert, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Icon } from "@rneui/base";
import ButtonComponent from "../Auth/LocalComponents/ButtonComponent";
import { useExpoUserGlobal } from "../../core/hooks/GlobalState";
import Api from "../../core/service/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ValidatieValueProps {
  status: boolean;
  message?: string;
}
const ModalMurid = ({ setShowModalMurid, showModalMurid }: any) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useExpoUserGlobal();

  const [nameValue, setNameValue] = useState("");
  const [nameValid, setNameValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });
  const [kelasValue, setkelasValue] = useState("");
  const [kelasValid, setkelasValid] = useState<ValidatieValueProps>({
    status: false,
    message: "",
  });
  const [jurusanValue, setJurusanValue] = useState("");
  const [jurusanValid, setJurusanValid] = useState<ValidatieValueProps>({
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
  const validatekelas = (kelasValue: string) => {
    const r = {
      status: kelasValue.length >= 1,
      message: "kelas must be at least 1 characters",
    };
    setkelasValid(r);
  };
  const validateJurusan = (JurusanValue: string) => {
    const r = {
      status: JurusanValue.length >= 1,
      message: "Jurusan must be at least 1 characters",
    };
    setJurusanValid(r);
  };

  const validateFormValue = () => {
    validateName(nameValue);
    validatekelas(kelasValue);
    validateJurusan(jurusanValue);
  };
  const handleSubmit = async () => {
    validateFormValue();
    const CreateMurid = async () => {
      const token = await AsyncStorage.getItem("session");

      setLoading(true);
      const body = {
        nama: nameValue,
        kelas: kelasValue,
        jurusan: jurusanValue,
        userId: user?.id,
      };
      const api = new Api();
      api.url = "murid/create-data-murid";
      api.mode = "crm";
      api.body = body;
      api.auth = true;
      api.token = `Bearer ${token}`;
      const resp = await api.call();
      console.log(resp, "[[[[[]]");
      if (resp?.statusCode == 200) {
        setShowModalMurid(false);
      } else {
        Alert.alert("Terjadi kesalahan", "Silahkan priksa kembali data anda");
      }
    };
    CreateMurid();
  };
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent={true}
      style={styles.centeredView}
      visible={showModalMurid}
      onRequestClose={() => {
        setShowModalMurid(!showModalMurid);
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
            Masukan Data Murid
          </Text>
          <View>
            <View style={styles.inputContent}>
              <View style={styles.inputSubContent}>
                <TextInput
                  placeholder="Nama Lengkap"
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
                  placeholder="Kelas "
                  onChangeText={(value) => setkelasValue(value)}
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
                  placeholder="Juruasan "
                  onChangeText={(value) => setJurusanValue(value)}
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

export default ModalMurid;

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
