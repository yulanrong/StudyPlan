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
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.StudyPlanDb");

const Timer = ({ route, navigation }) => {
  const text = route.params.text;
  const id = route.params.id;
  const [pause, setPause] = useState(false);
  const [duration, setDuration] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [hasTimer, setTimer] = useState(false);
  const [finished, setFinished] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  let interval = useRef();

  const onConfirm = () => {
    if (duration > 0) {
      setMinutes(duration);
      setTimer(true);
    }
  };

  const countdownMin = () => {
    setMinutes((prev) => prev - 1);
  };
  useEffect(() => {
    if (hasTimer && minutes > 0) {
      interval.current = setInterval(countdownMin, 60000);
    }
    if (minutes === 0) {
      clearInterval(interval.current);
      setFinished(true);
      setModalVisible(true);
    }
    return () => clearInterval(interval.current);
  }, [hasTimer, minutes]);

  const onPause = () => {
    if (!pause) {
      clearInterval(interval.current);
    } else {
      interval.current = setInterval(countdownMin, 60000);
    }
    setPause(!pause);
  };

  const updateDone = () => {
    db.transaction((tx) => {
      tx.executeSql("UPDATE plans SET done = 1 WHERE id = ?", [id]);
    });
    navigation.navigate({
      name: "Plan",
    });
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Image
              source={require("./assets/fireworks.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.subtitle}>You've finished this task!</Text>
          </View>
          <Pressable style={styles.pauseButton}>
            <Text style={styles.confirmText} onPress={updateDone}>
              {" "}
              Go Back to Study Plan
            </Text>
          </Pressable>
        </View>
      </Modal>
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
      <View style={styles.content}>
        <View style={styles.setTimerStyle}>
          <View style={styles.timerLayout}>
            <Text style={styles.timerText}>
              {" "}
              <FontAwesome
                name="hourglass-start"
                size={23}
                color="#3e2321"
              />{" "}
              Set Timer:{" "}
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={5}
              onChangeText={setDuration}
              value={duration}
              placeholder="0"
            />
            <Text style={styles.timerText}> Min</Text>
          </View>
          <Pressable onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmText}>
              {" "}
              Start <Entypo name="emoji-happy" size={23} color="white" />
            </Text>
          </Pressable>
        </View>
        {hasTimer ? (
          <View>
            <View style={styles.timerLayout}>
              <Image
                source={require("./assets/timer.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.timerText}>Time Remaining: </Text>
            </View>

            <View style={styles.countDownLayout}>
              <Text style={styles.countDownStyle}> {minutes} </Text>
              <Text style={styles.timerText}>Min</Text>
            </View>
            <Pressable style={styles.pauseButton} onPress={onPause}>
              {!pause ? (
                <Text style={styles.confirmText}>
                  {" "}
                  Want a Break?{" "}
                  <MaterialIcons
                    name="free-breakfast"
                    size={23}
                    color="white"
                  />{" "}
                </Text>
              ) : (
                <Text style={styles.confirmText}>
                  Continue!{" "}
                  <FontAwesome5 name="laugh-squint" size={23} color="white" />{" "}
                </Text>
              )}
            </Pressable>
            <Text>*Please stay on this page and keep your progress</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    alignItems: "flex-start",
    flex: 1,
    backgroundColor: "#a7b9b6",
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
    color: "#3e2321",
  },
  subtitle: {
    fontSize: 22,
    fontFamily: "Cochin",
    alignSelf: "center",
    padding: 10,
    marginBottom: 10,
    color: "#3e2321",
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
    color: "#d2691e",
  },
  confirmButton: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#2a5a4e",
    marginBottom: 30,
  },
  confirmText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
  setTimerStyle: {
    justifyContent: "center",
  },
  countDownLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  countDownStyle: {
    fontSize: 70,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#3e2321",
  },
  content: {
    flex: 1,
    backgroundColor: "#faebd7",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  pauseButton: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#ff7f50",
    marginBottom: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#a7b9b6",
  },
});

export default Timer;
