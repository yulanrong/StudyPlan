import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Timer = ({ route }) => {
  const text = route.params.text;
  const id = route.params.id;
  const [pause, setPause] = useState(false);
  const [second, setSecond] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("./assets/chick.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Focus On:</Text>
      </View>
      <Text style={styles.subtitle} numberOfLines={3}>
        {text}
      </Text>
      <View style={styles.timerLayout}>
        <Text style={styles.timerText}>
          {" "}
          <FontAwesome name="hourglass-start" size={23} color="#8b4513" /> Set
          Timer:{" "}
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={5}
          onChangeText={setSecond}
          value={second}
          placeholder="0"
        />
        <Text style={styles.timerText}> Min</Text>
      </View>
      <Pressable>
      <Image
          source={require("./assets/open-book.png")}
          style={styles.image}
          resizeMode="contain"
        />
        {!pause ?
        <Text> Want a Break? <MaterialIcons name="free-breakfast" size={24} color="black" /> </Text> :

        <Text>Start Learning! <FontAwesome5 name="laugh-squint" size={24} color="black" /> </Text>}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#ffe4e1",
    //justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 40,
  },
  title: {
    fontSize: 35,
    fontFamily: "Cochin",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "Cochin",
    alignSelf: "center",
    padding: 10,
    marginBottom: 30,
  },
  input: {
    fontSize: 35,
    height: 70,
    width: "30%",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  timerLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  timerText: {
    fontSize: 25,
  },
});

export default Timer;
