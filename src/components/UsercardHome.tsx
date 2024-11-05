import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BMIScreen() {
  const user = {
    name: "Abdul123",
    height: 171, // in cm
    weight: 64, // in kg
    bmi: 21.9,
  };

  return (
    <View>
      <Text style={styles.greeting}>Halo,</Text>
      <Text style={styles.name}>{user.name}!</Text>
      <View style={styles.divider} />
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Tinggi (Cm)</Text>
          <Text style={styles.infoValue}>{user.height}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Berat (Kg)</Text>
          <Text style={styles.infoValue}>{user.weight}</Text>
        </View>
      </View>
      <Text style={styles.bmiLabel}>Body Mass Index (BMI)</Text>
      <Text style={styles.bmiValue}>{user.bmi}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 18,
    color: "#333",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00BCD4",
  },
  divider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  infoBox: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    color: "#666",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00BCD4",
  },
  bmiLabel: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00BCD4",
  },
});
