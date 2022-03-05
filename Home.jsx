import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Plan from "./Plan.jsx";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        imageStyle={{ opacity: 0.5 }}
        style={styles.background}
        resizeMode="cover"
      >
        <Image
          source={require("./assets/student.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Your Study Plan</Text>
        <Text style={styles.subtitle}>What do you want to study today?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Plan")}
          style={styles.image}
        >
          <Image
            source={require("./assets/start.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Image
          source={require("./assets/chick.png")}
          style={styles.chickImage}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a7b9b6",
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3e2321",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
    color: "rgb(107, 60, 48)",
    fontWeight: "bold",
  },
  image: {
    width: 180,
    height: 100,
    alignSelf: "center",
  },
  chickImage: {
    width: 80,
    height: 70,
    alignSelf: "flex-start",
  },
});

export default Home;
