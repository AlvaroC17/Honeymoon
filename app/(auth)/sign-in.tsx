import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function SignInScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendCode = () => {
    // Insert logic to send verification code using Twilio Verify
    console.log("Sending code to:", phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Enter your phone number"
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>
      {/* Navigate to the verify-phone screen after sending code */}
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/verify-phone")}
      >
        <Text style={styles.buttonText}>Go to Verify Screen</Text>
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
