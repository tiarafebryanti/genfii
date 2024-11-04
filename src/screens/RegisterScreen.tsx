import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView
} from "react-native";
import Checkbox from "expo-checkbox";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AlertModal from "../components/AlertModal";
import SuccessModal from "../components/SuccessModal";
import { RegisterApi } from "../api/Auth";
import { saveID } from "../utils/handlingDataRegister";
import { saveToken } from "../utils/handlingDataLogin"; // Import saveToken function
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+62");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [successVisible, setSuccessVisible] = useState(false);

  const handlePhoneNumberChange = (value: string) => {
    if (!value.startsWith("+62")) {
      setPhoneNumber("+62");
    } else {
      setPhoneNumber(value);
    }
  };

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMessage("Harap masukkan format email yang valid.");
      setAlertVisible(true);
      return;
    }
    if (phoneNumber.length < 13) {
      setAlertMessage(
        "Harap masukkan nomor HP yang valid dengan format +62 dan lebih dari 12 digit."
      );
      setAlertVisible(true);
      return;
    }
    if (!username || !password || !confirmPassword) {
      setAlertMessage("Harap isi semua field.");
      setAlertVisible(true);
      return;
    }
    if (password !== confirmPassword) {
      setAlertMessage("Password dan Konfirmasi Password tidak cocok.");
      setAlertVisible(true);
      return;
    }
    if (!agree) {
      setAlertMessage("Anda harus menyetujui persyaratan penggunaan aplikasi.");
      setAlertVisible(true);
      return;
    }
      navigation.navigate("UserDetailScreen");
  };

  const openTerms = () => {
    Linking.openURL("https://example.com/syarat-ketentuan.pdf");
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://example.com/kebijakan-privasi.pdf");
  };

  return (
    <ResponsiveContainer>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.innerContainer}>
        <Image
          source={require("../../assets/register.png")}
          style={styles.image}
        />

        <Text style={styles.title}>Daftar</Text>
        <Text style={styles.subtitle}>Buat akun Genfit sekarang!</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <InputComponent
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome6 name="user" size={24} color="black" />
          <InputComponent
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="smartphone" size={24} color="black" />
          <InputComponent
            placeholder="Nomor HP (+62)"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" />
          <InputComponent
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" />
          <InputComponent
            placeholder="Konfirmasi Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View style={styles.agreementContainer}>
          <Checkbox value={agree} onValueChange={setAgree} />
          <Text style={styles.agreementText}>
            Saya setuju dengan{" "}
            <TouchableOpacity onPress={openTerms}>
              <Text style={styles.linkText}>Syarat dan Ketentuan</Text>
            </TouchableOpacity>{" "}
            dan{" "}
            <TouchableOpacity onPress={openPrivacyPolicy}>
              <Text style={styles.linkText}>Kebijakan Privasi</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <ButtonComponent title="Masuk" onPress={handleRegister} />

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}>
            Sudah punya akun?{" "}
            <Text style={styles.loginLink}>Login disini!</Text>
          </Text>
        </TouchableOpacity>

        <AlertModal
          visible={alertVisible}
          message={alertMessage}
          onClose={() => setAlertVisible(false)}
        />

        <SuccessModal
          visible={successVisible}
          onClose={() => setSuccessVisible(false)}
        />
      </View>
      </ScrollView>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 5,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  agreementContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  agreementText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#777",
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#777",
  },
  loginLink: {
    color: "#0FA18C",
    fontWeight: "bold",
  },
  linkText: {
    color: "#18B2A0",
    fontWeight: "bold",
    
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#18B2A0",
    borderRadius: 15,
    padding: 8,
    marginBottom: 16,
  },
});

export default RegisterScreen;
