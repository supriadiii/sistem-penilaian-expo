import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "./Api";
const loginCheck = async (userId) => {
  const api = new Api();
  const token = await AsyncStorage.getItem("session");
  console.log(token);
  // Set up API properties
  api.url = "user/get-user"; // Sesuaikan dengan endpoint yang benar
  api.mode = "crm"; // atau "crm", sesuai kebutuhan
  api.auth = true;
  api.body = { id: userId }; // Sesuaikan dengan format body yang diperlukan oleh API
  api.token = `Bearer ${token}`;
  console.log(api.token);

  try {
    const response = await api.call();
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error sesuai kebutuhan
  }
};

const createKelas = async (body) => {
  const api = new Api();
  const token = await AsyncStorage.getItem("session");
  // Set up API properties
  api.url = "kelas/create-data-kelas"; // Sesuaikan dengan endpoint yang benar
  api.mode = "crm"; // atau "crm", sesuai kebutuhan
  api.auth = true;
  api.body = body;
  // Sesuaikan dengan format body yang diperlukan oleh API
  api.token = `Bearer ${token}`;

  try {
    const response = await api.call();
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error sesuai kebutuhan
  }
};
const getAllKelas = async () => {
  const api = new Api();
  const token = await AsyncStorage.getItem("session");
  // Set up API properties
  api.url = "kelas/getAllKelas"; // Sesuaikan dengan endpoint yang benar
  api.mode = "crm"; // atau "crm", sesuai kebutuhan
  api.auth = true;
  api.body = {};
  // Sesuaikan dengan format body yang diperlukan oleh API
  api.token = `Bearer ${token}`;
  console.log(api.token);

  try {
    const response = await api.call();
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error sesuai kebutuhan
  }
};
const createMataPelajaran = async (body) => {
  const api = new Api();
  const token = await AsyncStorage.getItem("session");
  // Set up API properties
  api.url = "mata-pelajaran/create-mata-pelajaran"; // Sesuaikan dengan endpoint yang benar
  api.mode = "crm"; // atau "crm", sesuai kebutuhan
  api.auth = true;
  api.body = body;
  // Sesuaikan dengan format body yang diperlukan oleh API
  api.token = `Bearer ${token}`;
  console.log(api.token);

  try {
    const response = await api.call();
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error sesuai kebutuhan
  }
};
const getMataPelajaran = async (body) => {
  const api = new Api();
  const token = await AsyncStorage.getItem("session");
  // Set up API properties
  api.url = "mata-pelajaran/by-kelas"; // Sesuaikan dengan endpoint yang benar
  api.mode = "crm"; // atau "crm", sesuai kebutuhan
  api.auth = true;
  api.body = body;
  // Sesuaikan dengan format body yang diperlukan oleh API
  api.token = `Bearer ${token}`;
  console.log(api.token);

  try {
    const response = await api.call();
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error sesuai kebutuhan
  }
};
const createElements = async (body) => {
  const api = new Api();
  const token = await AsyncStorage.getItem("session");
  // Set up API properties
  api.url = "/elements/create"; // Sesuaikan dengan endpoint yang benar
  api.mode = "crm"; // atau "crm", sesuai kebutuhan
  api.auth = true;
  api.body = body;
  // Sesuaikan dengan format body yang diperlukan oleh API
  api.token = `Bearer ${token}`;
  console.log(api.token);

  try {
    const response = await api.call();
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle error sesuai kebutuhan
  }
};

// Fungsi untuk mengecek apakah device sudah login atau belum.
// fbToken adalah data firebaseToken yang diambil dari device.
const refreshSession = async () => {
  const _token = await AsyncStorage.getItem("session");
  if (_token === null) return;
  const api = new Api();
  api.mode = "crm";
  api.url = "v1/user";
  api.token = `Bearer ${_token}`;

  const resData = await api.call();
  if (resData?.user_id) {
    await AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...resData.user_data, token: resData.token })
    );
    return true;
  } else {
    return false;
  }
};

export {
  loginCheck,
  refreshSession,
  getAllKelas,
  createKelas,
  createMataPelajaran,
  getMataPelajaran,
  createElements,
};
