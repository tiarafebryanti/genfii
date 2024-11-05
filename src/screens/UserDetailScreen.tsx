import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserDetailApi } from "../api/Auth";
import { getToken } from "../utils/handlingDataLogin";
import { getID } from "../utils/handlingDataRegister";
import { RootStackParamList } from "../navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';

type UserDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UserDetailScreen"
>;

const UserDetailScreen: React.FC = () => {
  const navigation = useNavigation<UserDetailScreenNavigationProp>();
  const [fullName, setFullName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [dob, setDob] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [showPicker, setShowPicker] = useState(false);

  const handleDobChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || dob;
    setShowPicker(false);
    setDob(currentDate);
  };

  const handleSubmit = async () => {
    const token = await getToken();
    const userId = await getID();

    if (!userId || typeof userId !== "string") {
      Alert.alert("Error", "User ID not found or is invalid.");
      return;
    }

    if (!token || typeof token !== "string") {
      Alert.alert("Error", "Token not found or is invalid.");
      return;
    }

    const epochDob = Math.floor(dob.getTime() / 1000);
    const age = new Date().getFullYear() - dob.getFullYear();
    const monthDifference = new Date().getMonth() - dob.getMonth();
    const finalAge = monthDifference < 0 ? age - 1 : age;

    const userDetails = {
      full_name: fullName,
      height: parseFloat(height),
      weight: parseFloat(weight),
      age: finalAge,
      dob: epochDob,
      gender: gender,
    };

    try {
      const response = await UserDetailApi(userDetails, token, userId);

      Alert.alert("Success", "User details submitted successfully.");
      navigation.navigate("MainTabs");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.error?.message || "Failed to submit user details."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        source={require("../../assets/userdetail.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Data Diri</Text>
      <Text style={styles.subtitle}>
        Sebelum kita lanjut, kenalan dulu yuk!
      </Text>

      <View style={styles.inputContainer}>
        <FontAwesome6 name="user" size={18} color="#6A6A71" />
        <TextInput
          placeholder="Nama Lengkap"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome6 name="user" size={18} color="#6A6A71" />
        <TextInput
          placeholder="Umur"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome6 name="user" size={18} color="#6A6A71" />
        <TextInput
          placeholder="Berat (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome6 name="user" size={18} color="#6A6A71" />
        <TextInput
          placeholder="Tinggi (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.datePickerContainer}
        >
          <Text
            style={styles.dateText}
          >{`Tanggal Lahir: ${dob.toLocaleDateString()}`}</Text>
          <Ionicons name="calendar" size={24} color="#18B2A0" style={styles.calendarIcon} />
           
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dob}
            mode="date"
            is24Hour={true}
            onChange={handleDobChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Gender"
          value={gender}
          onChangeText={setGender}
          style={styles.genderInput}
        />
        <Octicons name="triangle-down" size={24} color="#18B2A0" style={styles.triangleIcon} />
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
    justifyContent: "center",
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  input: {
    padding: 5,
  },
  button: {
    backgroundColor: "#0FA18C",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 30,
    resizeMode: "contain",
  },
  scrollContainer: {
    padding: 20,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 8,
  },
  dateText: {
    flex: 1,
    color: "#6A6A71",
  },
  calendarIcon: {
    marginLeft: 8,
  },
  genderInput: {
    flex: 1,
    padding: 5,
  },
  triangleIcon: {
    marginRight: 14,
  },
  
});

export default UserDetailScreen;
