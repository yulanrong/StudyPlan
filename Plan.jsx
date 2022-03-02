import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  Button,
  TextInput,
  ScrollView
} from "react-native";
import * as SQLite from "expo-sqlite";
import PlanDetail from './PlanDetail.jsx';
const db = SQLite.openDatabase("db.StudyPlanDb");

const Plan = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [text, addText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  //const [refresh, setRefresh] = useState(0);
  //const [isAdded, setAdded] = useState(false);

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        " CREATE TABLE IF NOT EXISTS plans (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, done INTEGER DEFAULT 0)"
      );
    });
  };

  const getData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM plans", [],
        (tx, results) => {
          if (results.rows.length > 0) {
            setList(results.rows._array);
          }
        }
      )
    })
  }

  const insertData = () => {
    if (text.length > 0) {
      db.transaction((tx) => {
       tx.executeSql(
          "INSERT INTO plans (text) VALUES (?)", [text],
          (txObj, result) => {
            let newEntry = {done: 0, id: result.insertId, text: text};
            setList(list => [...list, newEntry]);
          }
        );
      });
    }
    setModalVisible(!modalVisible);
    addText('');
  };



  const handleDelete = (itemId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM plans WHERE id = ? ", [itemId],
        (txObj, result) => {
            let filteredList = list.filter(item => {
              return item.id !== itemId;
            });
            setList(filteredList);

        }
      )
    });
  };

  console.log(list);

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
              <Text style={styles.closeText} onPress={() => setModalVisible(!modalVisible)}>X</Text>
            </Pressable>
            <TextInput
              style={styles.input}
              onChangeText={addText}
              value={text}
              placeholder="What's your plan?"
            />

            <Button
              title="Save"
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => insertData()}
            />
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
      {list.length > 0 ?

      <ScrollView style={styles.content}>

        {list.map((item, index) =>
        <PlanDetail key={index} item={item.text} id={item.id} done={item.done} navigation={navigation} />)}

      </ScrollView>
      : null}
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
    alignSelf: "flex-end",
  },
  closeText: {
    textAlign: "center",
    fontSize: 20,
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
