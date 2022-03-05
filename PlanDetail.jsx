import React, { useState, useEffect } from "react";
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
  Animated,
  TouchableOpacity,
} from "react-native";
import Timer from "./Timer.jsx";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.StudyPlanDb");

const PlanDetail = ({ done, id, text, navigation, onRemove, handleCopy }) => {
  const leftSwipe = () => {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity onPress={onRemove(id)}>
          <View style={styles.delete}>
            <Animated.Text style={styles.deleteText}>
              <AntDesign name="delete" size={24} />
            </Animated.Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCopy(id)}>
          <View style={styles.edit}>
            <Animated.Text style={styles.deleteText}>
              <AntDesign name="copy1" size={24} />
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={leftSwipe}>
      <View style={styles.planStyle}>
        <Image
          source={require("./assets/check-list.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.content}>{text}</Text>
        {done === 1 ? (
          <View style={styles.startButton}>
            <AntDesign name="checkcircleo" size={40} color="green" />
          </View>
        ) : (
          <Pressable style={styles.startButton}>
            <Text
              style={styles.buttonText}
              onPress={() =>
                navigation.navigate({
                  name: "Timer",
                  params: { text: text, id: id },
                })
              }
            >
              {" "}
              Start
            </Text>
          </Pressable>
        )}
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  planStyle: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    padding: 4,
    alignItems: "center",
    borderBottomWidth: 1,
  },

  image: {
    width: 45,
    height: 35,
  },

  content: {
    fontSize: 22,
    fontFamily: "Cochin",
    width: "65%",
  },
  startButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#d2691e",
    justifyContent: "center",
  },
  delete: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7f50",
    width: 80,
    height: 55,
    borderWidth: 2,
    borderColor: "white",
  },
  deleteText: {
    color: "white",
  },
  swipeContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    padding: 4,
    alignItems: "center",
  },
  edit: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5f9ea0",
    width: 80,
    height: 55,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default PlanDetail;
