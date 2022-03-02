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
  TouchableOpacity
} from "react-native";
import Timer from "./Timer.jsx";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.StudyPlanDb");

const PlanDetail = ({item, id, done, navigation, handleDelete}) => {

  // const handleDelete = (id) => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "DELETE FROM plans WHERE id = ? ", [id],
  //       (txObj, result) => {
  //         if (result.rowAffected > 0) {
  //           let filteredList = list.filter(item => {
  //             return item.id !== id;
  //           });
  //           setList(filteredList);
  //         }
  //       }
  //     )
  //   });
  // };

 console.log(id);

  const handleUpdate = () => {

  };

  const leftSwipe = () => {

    return (
      <View style={styles.swipeContainer}>

      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.delete}>
          <Animated.Text style={styles.deleteText}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUpdate}>
        <View style={styles.edit}>
          <Animated.Text style={styles.deleteText}>
            Edit
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
      <Text style={styles.content}>{item}</Text>
      {done === 1 ? <Text>
        Finished!
      </Text> : <Pressable style={styles.startButton}>
              <Text style={styles.buttonText} onPress={() => navigation.navigate("Timer")}> Start </Text>
            </Pressable>}

    </View>
    </Swipeable>
  )
};

const styles = StyleSheet.create({

  planStyle: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    padding: 4,
    alignItems: 'center',
    borderBottomWidth: 1,
  },

  image: {
    width: 45,
    height: 35,
  },

  content: {
    fontSize: 22,
    fontFamily: "Cochin",
    width: '65%'
  },
  startButton : {
    flexDirection: "row",
    justifyContent: 'flex-end',

  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#d2691e",
    justifyContent: "center",

  },
  delete: {
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#ff7f50',
    width: 60,
    height: 55,
    borderWidth: 1,
    borderColor: 'white',
  },
  deleteText: {
    fontSize: 15,
    color: 'white',
  },
  swipeContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    padding: 4,
    alignItems: 'center',
  },
  edit: {
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#5f9ea0',
    width: 60,
    height: 55,
    borderWidth: 1,
    borderColor: 'white'
  },


});

export default PlanDetail;