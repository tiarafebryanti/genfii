import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Image,
} from "react-native";
import ProgramCard from "../components/ProgramCard";
import UserCard from "../components/UserCard";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { getToken } from "../utils/handlingDataLogin";
import ApiManager from "../api/ApiManager";
import { calculateBMI, getNutritionalStatus } from "../utils/bmiHelper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [hasPreTest, setHasPreTest] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState(false); // Error state to handle fetch failures

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
        setUserData(response.data);

        const bmi = calculateBMI(userDetails.weight, userDetails.height);
        const nutritionalStatus = getNutritionalStatus(bmi);
        setStatus(nutritionalStatus);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(true); // Set error to true if fetching fails
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTelehealthPress = () => {
    navigation.navigate("Telehealth");
  };

  const handlePreTestPress = () => {
    console.log("Pre-Test button pressed");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00b4ac" />;
  }

  return (
    <ResponsiveContainer>
      <ImageBackground
        source={require("../../assets/header.png")}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      />
      <Image source={require("../../assets/logo1.png")} style={styles.logo1} />
      <Image source={require("../../assets/logo2.png")} style={styles.logo2} />

      <TouchableOpacity
        onPress={handlePreTestPress}
        style={styles.notificationButton}
      >
        <MaterialCommunityIcons name="bell" size={24} color="#FFF" />
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        {error ? (
          <Text style={styles.errorText}>ERR!</Text>
        ) : userData && userData.user_information ? (
          <UserCard
            name={userData.user_information.full_name}
            height={userData.user_information.height}
            weight={userData.user_information.weight}
            status={status}
          />
        ) : (
          <Text>No user data available</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.telehealthContainer}
        onPress={handleTelehealthPress}
      >
        <View style={styles.iconTextContainer}>
          <MaterialCommunityIcons
            name="stethoscope"
            size={30}
            color="#D2DC02"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.telehealthTitle}>Telehealth</Text>
            <Text style={styles.telehealthDescription}>
              Konsultasi dengan tenaga kesehatan disini!
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.programContainer}>
        <View style={styles.cardContainer}>
          <ProgramCard completed={0} total={10} />
          <ProgramCard completed={5} total={10} />
          <ProgramCard completed={3} total={10} />
          <ProgramCard completed={8} total={10} />
        </View>

        {!hasPreTest && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>
              Anda belum melakukan pre-test
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={handlePreTestPress} style={styles.ctaButton}>
        <LinearGradient
          colors={["#44D3B6", "#2980B9"]}
          start={[0, 0]}
          end={[1, 1]}
          style={styles.gradient}
        >
          <Text style={styles.ctaTitle}>Pre-Test</Text>
          <Text style={styles.ctaSubtitle}>Lorem ipsum dolor sit amet!</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  notificationButton: {
    position: "absolute",
    top: 30,
    right: 20,
    padding: 10,
    borderRadius: 20,
  },
  errorText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
  telehealthContainer: {
    borderColor: "#00b4ac",
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  telehealthTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00b4ac",
    textAlign: "left",
  },
  telehealthDescription: {
    fontSize: 16,
    color: "#000000",
    textAlign: "left",
  },
  programContainer: {
    width: "100%",
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    borderRadius: 10,
  },
  overlayText: {
    fontSize: 18,
    color: "#009688",
    fontWeight: "bold",
    textAlign: "center",
  },
  ctaButton: {
    marginTop: 30,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  gradient: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  ctaSubtitle: {
    fontSize: 21,
    color: "#fff",
    marginTop: 5,
  },
  imageBackground: {
    width: "100%",
    height: 300, // Set the height to cover the header area
    justifyContent: "center",
    alignItems: "center",
    marginTop: -80,
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
  },
});

export default HomeScreen;
