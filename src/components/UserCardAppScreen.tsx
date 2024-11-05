import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Abdul Abdullah</Text>
      <Text style={styles.username}>abdul123</Text>
      <Text style={styles.email}>Email@123mail</Text>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Image source={require("../../assets/iconHeight.png")} />
          <View>
            <Text style={styles.infoValue}>171</Text>
            <Text style={styles.infoLabel}>Tinggi (Cm)</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
        <Image source={require("../../assets/iconWeight.png")} />
        <View>
          <Text style={styles.infoValue}>64</Text>
          <Text style={styles.idealLabel}>Berat (Kg)</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
        <Image source={require("../../assets/iconIdeal.png")} />
        <View>
          <Text style={styles.infoValueBMI}>21.9</Text>
          <Text style={styles.ideal}>Ideal</Text>
          <Text style={styles.subLabel}>Body Mass Index (BMI)</Text>
          </View>
        </View>
      </View>

      <View style={styles.bmrSection}>
        <Text style={styles.bmrLabel}>Basal Metabolic Rate (BMR)</Text>
        <Text style={styles.bmrValue}>1,629 Kalori</Text>
      </View>

      <View style={styles.nutrientsSection}>
        <View style={styles.nutrientItem}>
          <Text style={styles.nutrientValue}>15</Text>
          <Text style={styles.nutrientLabel}>Protein</Text>
        </View>
        <View style={styles.nutrientItem}>
          <Text style={styles.nutrientValue}>6</Text>
          <Text style={styles.nutrientLabel}>Lemak</Text>
        </View>
        <View style={styles.nutrientItem}>
          <Text style={styles.nutrientValue}>18</Text>
          <Text style={styles.nutrientLabel}>Karbohidrat</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
      <FontAwesome6 name="edit" size={20} color="white" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    marginTop: -125,
    borderWidth: 1,
    borderColor: "#18B2A0",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#18B2A0",
    width: 300,
  },
  username: {
    fontSize: 16,
    color: "#6A6A71",
    width: 300,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#6A6A71",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#6A6A71",
    paddingBottom: 15,
    width: 300,
  },
  infoSection: {
    width: "100%",
    marginBottom: 20,
    rowGap: 15,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 5,
    width: 300,
    alignItems: "center",
    gap: 10,
    
  },
  infoValue: {
    fontSize: 24,
    color: "#18B2A0",
  },
  infoLabel: {
    fontSize: 16,
    color: "#6A6A71",
  },
  subLabel: {
    fontSize: 14,
    color: "#6A6A71",
   
  },
  bmrSection: {
    alignItems: "center",
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#D9D9D9",
    width: 300,
    paddingTop: 20,
  },
  bmrLabel: {
    fontSize: 16,
    color: "#6A6A71",
  },
  bmrValue: {
    fontSize: 24,
    color: "#18B2A0",
  },
  idealLabel: {
    fontSize: 16,
    color: "#6A6A71",
  },
  ideal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#18B2A0",
    width: 300,
  },
  infoValueBMI: {
    fontSize: 18,
    color: "#18B2A0",
  },
  nutrientsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  nutrientItem: {
    alignItems: "center",
  },
  nutrientValue: {
    fontSize: 24,
    color: "#18B2A0",
  },
  nutrientLabel: {
    fontSize: 16,
    color: "#6A6A71",
  },
  editButton: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#18B2A0",
    paddingVertical: 10,
    marginBottom: -20,
    marginLeft: -20,
    marginRight: -20,
    width: 340,
    borderBottomEndRadius: 19,
    borderBottomStartRadius: 19,
    justifyContent: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default ProfileCard;
