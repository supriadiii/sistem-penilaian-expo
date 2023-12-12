import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useExpoUserGlobal } from "../core/hooks/GlobalState";
import { loginCheck } from "../core/service/SistemPenilaian";
import ModalGuru from "./AddUserInformation/ModalGuru";
import ModalMurid from "./AddUserInformation/ModalMurid";

const Home = (props: any) => {
  const [user, setUser] = useExpoUserGlobal();
  const [showModalGuru, setShowModalGuru] = useState(false);
  const [showModalMurid, setShowModalMurid] = useState(false);
  console.log(showModalGuru, "//////////");
  useEffect(() => {
    const getUser = async () => {
      const respone = await loginCheck(user.id);
      console.log("asakskalsks", respone?.data?.user?.role);
      if (respone.statusCode == 200 && respone?.data?.user?.role === "GURU") {
        if (respone?.data?.user?.guru === null) {
          console.log("ini trueeeeeeeeeeeeee");
          setShowModalGuru(true);
        } else {
          setShowModalGuru(false);
        }
      } else if (
        respone.statusCode == 200 &&
        respone?.data?.user?.role === "MURID"
      ) {
        if (respone?.data?.user?.murid === null) {
          console.log("ini berhasilllllllllllllll");
          setShowModalMurid(true);
        } else {
          setShowModalMurid(false);
        }
      } else {
        console.log("error", respone);
      }
    };
    getUser();
  }, [user, showModalGuru]);
  return (
    <View style={{ backgroundColor: "#26E467", flex: 1 }}>
      <View
        style={{
          height: 300,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 250, resizeMode: "stretch", height: 80 }}
          source={require("../assets/ilustrator/Assetlg.png")}
        />
      </View>

      <View style={styles.countainerAction}>
        {/* <Image source={require("../assets/FotoProfil.png")} /> */}
        <View
          style={{
            width: "100%",
            paddingBottom: 100,
          }}
        >
          <ScrollView>
            <Text style={styles.TextStyle}>Hallo....</Text>
            <Text style={styles.TextStyle2}>
              Selamat datang di SmartAssess, {user?.username}{" "}
            </Text>
            <Text style={styles.TextStyle3}>
              SmartAssess adalah solusi penilaian pendidikan digital yang
              canggih dan inovatif. Dibuat untuk mengubah cara penilaian dan
              evaluasi pembelajaran dilakukan, SmartAssess memungkinkan pendidik
              untuk dengan mudah membuat, mengelola, dan menganalisis penilaian
              hasil belajar siswa secara efisien.
            </Text>
          </ScrollView>
        </View>
      </View>
      <ModalGuru
        setShowModalGuru={setShowModalGuru}
        showModalGuru={showModalGuru}
      />
      <ModalMurid
        setShowModalMurid={setShowModalMurid}
        showModalMurid={showModalMurid}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleText: {
    paddingVertical: 56,
    textAlign: "center",
    fontSize: 24,
    marginTop: 20,
    color: "white",
    fontFamily: "Poppins_Bold",
  },
  countainerAction: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "white",
    padding: 40,
    gap: 20,
  },
  ButtonMahasiswa: {
    backgroundColor: "#26E467",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 12,
    width: "100%",
    marginBottom: 10,
  },
  TextStyle: {
    fontFamily: "Poppins_SemiBold",
    fontSize: 24,
  },
  TextStyle2: {
    fontFamily: "Poppins_SemiBold",
    fontSize: 16,
  },
  TextStyle3: {
    fontFamily: "Poppins_Regular",
    fontSize: 16,
  },
});
