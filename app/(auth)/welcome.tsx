import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Honeymoon!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/sign-in")}
      >
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
