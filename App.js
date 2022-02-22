import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import Plan from "./Plan.jsx";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        imageStyle={{ opacity: 0.55 }}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.title}>Your Study Plan</Text>
        <Text style={styles.subtitle}>What do you want to study today?</Text>
        <TouchableOpacity onPress={() => Alert.alert("click")}>
          <Image
            source={require("./assets/start.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Cochin",
    color: "#3e2321",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Cochin",
    marginBottom: 0,
    color: "#8f5546",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
