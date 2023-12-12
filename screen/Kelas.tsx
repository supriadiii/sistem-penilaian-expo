import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllKelas } from "../core/service/SistemPenilaian";
import { Icon } from "@rneui/base";
import ButtonComponent from "./Auth/LocalComponents/ButtonComponent";
import ModalAddKelas from "./AddKelas/ModalAddKelas";

const Kelas = (props) => {
  const [dataKelas, setDataKelas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKelas, setFilteredKelas] = useState<any>(dataKelas);
  const [showModalAddKelas, setShowModalAddKelas] = useState(false);

  useEffect(() => {
    const getKelas = async () => {
      const response = await getAllKelas();
      console.log("response", response);

      if (response?.statusCode === 200) {
        setDataKelas(response?.data);
      } else {
        Alert.alert("Server Maintaince", "Silahkan coba beberapa waktu lagi ");
      }
    };
    getKelas();
  }, [dataKelas]);
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (searchQuery !== "") {
      const filteredItems = dataKelas.filter(
        (item) =>
          item.nama.toLowerCase().includes(text.toLowerCase()) ||
          item.waliKelas.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredKelas(filteredItems);
    } else {
      setFilteredKelas(dataKelas); // When there is no search query, show all classes
    }
  };
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredKelas(dataKelas);
    }
  }, [dataKelas]);

  const handleSubmit = async () => {
    setShowModalAddKelas(true);
  };

  const handleMateriPress = (kelas) => {
    // Navigate to the MataPelajaran screen with the kelas data as parameters
    props.props.navigation.navigate("MataPelajaran", {
      kelasId: kelas.id,
      mataPelajaran: kelas.mataPelajaran,
    });
  };
  console.log("filteredKelas", filteredKelas);
  console.log("dataKelas", dataKelas);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTitleBar}>List Kelas</Text>
      </View>
      <View style={styles.viewSearch}>
        <TextInput
          placeholder="Search Kelas..."
          style={styles.textInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="search" type="ionicon" color="#000000" />
      </View>
      <ButtonComponent label="Tambah Kelas" action={handleSubmit} />

      <ScrollView>
        <View
          style={{
            margin: 20,
            paddingHorizontal: 10,
            paddingBottom: 150,
            paddingTop: 10,
            borderRadius: 10,
            flexDirection: "column",
            gap: 20,
          }}
        >
          {filteredKelas.length > 0 ? (
            filteredKelas.map((kelas: any) => (
              <TouchableOpacity
                key={kelas.id}
                onPress={() => handleMateriPress(kelas)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                    backgroundColor: "#65B741",
                    padding: 10,
                    borderRadius: 20,
                  }}
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/ilustrator/loginandregis.png")}
                  />
                  <View style={{ flex: 1, gap: 5 }}>
                    <Text style={{ fontWeight: "bold" }}>{kelas.nama}</Text>
                    <Text
                      style={{ color: "white" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {kelas.waliKelas}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Jumlah siswa : {kelas?.murid?.length}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontFamily: "Poppins_Regular", fontSize: 12 }}>
              No matching results found.
            </Text>
          )}
        </View>
      </ScrollView>
      <ModalAddKelas
        setShowModalAddKelas={setShowModalAddKelas}
        showModalAddKelas={showModalAddKelas}
      />
    </View>
  );
};

export default Kelas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    gap: 12,
    // paddingVertical: ,
    // paddingHorizontal: 20,
  },
  textInput: {
    flex: 1,
    fontFamily: "Poppins_Regular",
    color: "#000000",
  },
  viewSearch: {
    backgroundColor: "#FCFCFC",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#65B741",
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textTitleBar: {
    fontSize: 20,
    fontFamily: "Poppins_Bold",
    color: "#FFFFFF",
    paddingTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderStyle: "solid",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
});
