// import React from "react";
// import { View, Text, StyleSheet, Image } from "react-native";

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Honeymoon</Text>
//       <Image
//         source={require("../../../assets/images/logo-honeymoon-1-1.png")}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: { fontSize: 24 },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  // State for modals
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  // Reanimated shared values for card swiping
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Define the pan gesture
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationX > 100) {
        // Swiped right: animate off screen to the right
        translateX.value = withSpring(width);
      } else if (event.translationX < -100) {
        // Swiped left: animate off screen to the left
        translateX.value = withSpring(-width);
      } else {
        // Snap back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  // Animate the card's position & rotation
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${translateX.value / 20}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* <Text style={styles.headerTitle}>HONEYMOON</Text> */}
      <Image
        style={styles.headerImage}
        source={require("../../../assets/images/logo-honeymoon-pink-1-1.png")}
        resizeMode="contain"
      ></Image>
      {/* Top-left info icon -> Info Modal */}
      <TouchableOpacity
        style={styles.topLeftIcon}
        onPress={() => setInfoModalVisible(true)}
      >
        <Ionicons name="information-circle-outline" size={30} color="#333" />
      </TouchableOpacity>

      {/* Top-right help icon -> Help Modal */}
      <TouchableOpacity
        style={styles.topRightIcon}
        onPress={() => setHelpModalVisible(true)}
      >
        <Ionicons name="help-circle-outline" size={30} color="#333" />
      </TouchableOpacity>

      {/* Swipeable Card (contains the image & text) */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <Image
            source={require("../../../assets/images/photo-athens-greece.jpg")}
            style={styles.cardImage}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.destinationTitle}>PARIS</Text>
            <Text style={styles.destinationSubtitle}>FRANCE</Text>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Bottom corner icons + center button */}
      <View style={styles.footerContainer}>
        {/* Bottom-left dismiss icon */}
        <View style={styles.circleButton}>
          <Ionicons name="close" size={24} color="#FFF" />
        </View>

        {/* Book Destination button */}
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>BOOK DESTINATION</Text>
        </TouchableOpacity>

        {/* Bottom-right like icon */}
        <View style={styles.circleButton}>
          <Ionicons name="heart" size={24} color="#FFF" />
        </View>
      </View>

      {/* Info Modal */}
      <Modal
        visible={infoModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>App Info</Text>
            <Text style={styles.modalText}>Honeymoon v1.0</Text>
            <Text style={styles.modalText}>Designed by Citrus Apps Lab</Text>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setInfoModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Help Modal */}
      <Modal
        visible={helpModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setHelpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Get Started!</Text>
            <Text style={styles.modalText}>Swipe Right = Like</Text>
            <Text style={styles.modalText}>Swipe Left = Dismiss</Text>
            <Text style={styles.modalText}>
              Book Destination = Tap the button
            </Text>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setHelpModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  headerImage: {
    marginTop: 50,
    width: 250,
    height: 50,
  },
  // headerTitle: {
  //   marginTop: 50,
  //   fontSize: 28,
  //   fontWeight: "bold",
  //   color: "#FF0066",
  // },
  topLeftIcon: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  topRightIcon: {
    position: "absolute",
    top: 60,
    right: 20,
  },
  card: {
    marginTop: 10,
    width: width * 0.9,
    height: height * 0.7, // Enough space so the image is not cut off
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: "80%", // Let the image occupy 70% of the card
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  destinationTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  destinationSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  footerContainer: {
    position: "absolute",
    bottom: 60, // Adjust for tab bar
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#000", // black circle
    alignItems: "center",
    justifyContent: "center",
  },
  bookButton: {
    backgroundColor: "#FF0066",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  closeModalButton: {
    marginTop: 15,
    backgroundColor: "#FF0066",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeModalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
