import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "@rneui/base";
import ButtonComponent from "./Auth/LocalComponents/ButtonComponent";
import { ScrollView } from "react-native";
import ModalAddelElement from "./AddKelas/ModalAddelElement";
import ModalAddMapel from "./AddKelas/ModalAddMapel";
import { getMataPelajaran } from "../core/service/SistemPenilaian";
import OverlayLoading from "./components/OverlayLoading";

const MataPelajaran = (props: any) => {
  const [dataMp, setDataMp] = useState(props?.route?.params?.mataPelajaran);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModalAddMapel, setShowModalAddMapel] = useState(false);
  const [dataMapel, setDataMapel] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filteredMataPelajaran, setFilteredMataPelajaran] =
    useState<any>(dataMapel);

  useEffect(() => {
    const getKelas = async () => {
      setLoading(true);
      const body = {
        kelasId: props?.route?.params?.kelasId,
      };
      const response = await getMataPelajaran(body);
      console.log("response", response?.statusCode);

      if (response?.statusCode === 200) {
        setDataMapel(response?.data);
        setLoading(false);
      } else {
        Alert.alert("Server Maintaince", "Silahkan coba beberapa waktu lagi ");
        setLoading(false);
      }
    };
    getKelas();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredMataPelajaran(dataMapel);
    }
  }, [dataMapel]);
  console.log("dataMapel", dataMapel);
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (searchQuery !== "") {
      const filteredItems = dataMapel.filter(
        (item) =>
          item.nama.toLowerCase().includes(text.toLowerCase()) ||
          item.guruMapel.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredMataPelajaran(filteredItems);
    } else {
      setFilteredMataPelajaran(dataMapel); // When there is no search query, show all classes
    }
  };
  const handleSubmit = async () => {
    setShowModalAddMapel(true);
  };
  const handleMateriPress = (mataPelajaran) => {
    // Navigate to the MataPelajaran screen with the kelas data as parameters
    props.props.navigation.navigate("MataPelajaran", {
      mpId: mataPelajaran.id,
      mataPelajaran: mataPelajaran.mataPelajaran,
    });
  };
  console.log("dataMp", dataMp.id);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTitleBar}>List MataPelajaran</Text>
      </View>
      <View style={styles.viewSearch}>
        <TextInput
          placeholder="Search MataPelajaran..."
          style={styles.textInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="search" type="ionicon" color="#000000" />
      </View>
      <ButtonComponent
        label="Tambah Element Pembelajaran"
        action={handleSubmit}
      />
      <OverlayLoading isVisible={loading} />
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
          {filteredMataPelajaran.length > 0 ? (
            filteredMataPelajaran.map((MataPelajaran: any) => (
              <TouchableOpacity
                key={MataPelajaran.id}
                onPress={() => handleMateriPress(MataPelajaran)}
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
                    <Text style={{ fontWeight: "bold" }}>
                      {MataPelajaran.nama}
                    </Text>
                    <Text
                      style={{ color: "white" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {MataPelajaran?.guruMapel}
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
      <ModalAddMapel
        idKelas={props?.route?.params?.kelasId}
        setShowAddMapel={setShowModalAddMapel}
        showAddMapel={showModalAddMapel}
      />
    </View>
  );
};

export default MataPelajaran;

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
