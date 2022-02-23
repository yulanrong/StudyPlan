import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Pressable,
} from "react-native";

const Plan = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        imageStyle={{ opacity: 0.5 }}
        style={styles.background}
        resizeMode="cover"
      >
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add Your Plan</Text>
        </Pressable>
        <View style={styles.content}>

        </View>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#2a5a4e',
  },
  buttonText: {
    fontSize: 22,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#e0e6e4',
  },
  content: {
    flex: 1,
    backgroundColor: "#a7b9b6",
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 20,
    padding: 15,
    marginBottom: 10
  }
});

export default Plan;
