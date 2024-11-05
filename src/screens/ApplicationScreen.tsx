import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ProfileCard from "../components/UserCardAppScreen"
import { getToken } from "../utils/handlingDataLogin";
import ApiManager from "../api/ApiManager";
import { calculateBMI, getNutritionalStatus } from "../utils/bmiHelper";
import LogoutButton from "../components/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type RootStackParamList = {
  EditProfile: undefined;
  BMICalculatorScreen: undefined;
  Login: undefined;
};

type ApplicationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditProfile"
>;

type ApplicationScreenProps = {
  navigation: ApplicationScreenNavigationProp;
};

const ApplicationScreen: React.FC<ApplicationScreenProps> = ({
  navigation,
}) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          alert("Token not found");
          return;
        }

        const response = await ApiManager.get("/users/me", {
          params: { populate: "user_information" },
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        });

        const userDetails = response.data.user_information;
        const bmi = calculateBMI(userDetails.weight, userDetails.height);
        const nutritionalStatus = getNutritionalStatus(bmi);
        setStatus(nutritionalStatus);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleBMICalculator = () => {
    navigation.navigate("BMICalculatorScreen");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00b4ac" />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <ImageBackground
        source={require("../../assets/header.png")}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      />
      <Image source={require("../../assets/logo1.png")} style={styles.logo1} />
      <Image source={require("../../assets/logo2.png")} style={styles.logo2} />
      <View style={styles.subcontainer}>
        {userData && userData.user_information ? (
          <ProfileCard
          />
        ) : (
          <Text>No user data available</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleBMICalculator}>
          <Ionicons
            name="calculator"
            size={30}
            color="#1D95D6"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>BMI Calculator</Text>
            <Text style={styles.subtitle}>
              Hitung Body Mass Index (BMI) disini
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <FontAwesome5 name="medal" size={30} color="#DEB447" style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.titleCertificate}>Certificate</Text>
            <Text style={styles.subtitle}>
              Lihat sertifikat yang kamu dapatkan disini
            </Text>
          </View>
        </TouchableOpacity>

        <LogoutButton onLogout={handleLogout}/>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#18B2A0",
    backgroundColor: "#ffffff",
    marginBottom: 20,
    width: "100%",
  },
  imageBackground: {
    width: "100%",
    height: 300, // Set the height to cover the header area
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
  },
  imageStyle: {
    resizeMode: "cover", // Use 'cover' to ensure the image fills the header without distortion
  },
  logo1: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    position: "absolute",
    top: 20,
    left: 20,
  },
  logo2: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    position: "absolute",
    marginLeft: 75,
    top: -5,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D95D6",
  },
  titleCertificate: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DEB447",
  },
  subtitle: {
    fontSize: 14,
    color: "#334155",
  },
});

export default ApplicationScreen;
