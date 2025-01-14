import AsyncStorage from "@react-native-async-storage/async-storage";

const saveToken = async (value: string) => {
  if (!value) {
    throw new Error("Tidak dapat menyimpan token: nilai tidak valid.");
  }
  try {
    await AsyncStorage.setItem('token', value);
    console.log("Token saved:", value); // Log the token
  } catch (e) {
    alert(`Saving data failed: ${e}`);
  }
};

const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    alert(`Remove data failed: ${e}`);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log("Token retrieved:", token); // Log the token
    return token;
  } catch (e) {
    alert(`Getting data failed: ${e}`);
  }
};

export {
  saveToken,
  deleteToken,
  getToken
};
