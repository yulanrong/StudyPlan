import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import * as SQLite from "expo-sqlite";
import PlanDetail from "./PlanDetail.jsx";
const db = SQLite.openDatabase("db.StudyPlanDb");

const Plan = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [text, addText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [planModal, setPlanModal] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      createTable();
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        " CREATE TABLE IF NOT EXISTS plans (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, done INTEGER DEFAULT 0)"
      );
    });
  };

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM plans", [], (txObj, results) => {
        if (results.rows.length > 0) {
          setList(results.rows._array);
        }
      });
    });
  };

  const insertData = () => {
    if (text.length > 0) {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO plans (text) VALUES (?)",
          [text],
          (txObj, result) => {
            let newEntry = { done: 0, id: result.insertId, text: text };
            setList((list) => [...list, newEntry]);
          }
        );
      });
      setModalVisible(!modalVisible);
      addText("");
    }
  };

  const handleCopy = (id) => (e) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT text FROM plans WHERE id = ? ",
        [id],
        (tx, { rows: { _array } }) => {
          tx.executeSql(
            "INSERT INTO plans (text) VALUES (?)",
            [_array[0].text],
            (txObj, result) => {
              let newEntry = {
                done: 0,
                id: result.insertId,
                text: _array[0].text,
              };
              setList((list) => [...list, newEntry]);
            }
          );
        }
      );
    });
  };

  const onRemove = (id) => (e) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM plans WHERE id = ? ", [id]);
    });
    setList(list.filter((plan) => plan.id !== id));
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
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Pressable style={styles.closeButton}>
              <Image
                source={require("./assets/chick.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text
                style={styles.closeText}
                onPress={() => setModalVisible(!modalVisible)}
              >
                X
              </Text>
            </Pressable>

            <TextInput
              style={styles.input}
              onChangeText={addText}
              value={text}
              placeholder="What's your plan?"
            />

            <Pressable style={styles.saveButton} onPress={() => insertData()}>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Your Plan</Text>
        <Image
          source={require("./assets/chick.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </Pressable>
      {list.length > 0 ? (
        <ScrollView style={styles.content}>
          {list.map((item) => (
            <PlanDetail
              key={item.id}
              {...item}
              onRemove={onRemove}
              navigation={navigation}
              handleCopy={handleCopy}
            />
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a7b9b6",
    justifyContent: "center",
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "#2a5a4e",
  },
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: "#a0522d",
  },
  saveText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#e0e6e4",
  },
  image: {
    width: 40,
    height: 30,
  },
  content: {
    flex: 1,
    backgroundColor: "#faebd7",
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 20,
    padding: 15,
    marginBottom: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
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
  closeButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  closeText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#8f5546",
  },
  input: {
    fontSize: 20,
    height: 80,
    width: "100%",
    textAlign: "center",
  },
});

export default Plan;
