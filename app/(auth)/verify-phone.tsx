import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function VerifyPhoneScreen() {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    // Insert logic to verify the code
    console.log("Verifying code:", code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Phone</Text>
      <TextInput
        placeholder="Enter verification code"
        style={styles.input}
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "darkblue",
  },
  buttonText: { color: "white", fontSize: 16 },
});
