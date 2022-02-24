import React, {useState} from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

const Plan = () => {
  const [list, setList] = useState([]);

  return (
    <View style={styles.container}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add Your Plan</Text>
          <Image
            source={require("./assets/chick.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
        {list.length > 0 ?

        <View style={styles.content}>

        </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: '#2a5a4e',
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#e0e6e4',
  },
  image: {
    width: 40,
    height: 30,
  },
  content: {
    flex: 1,
    //backgroundColor: "#a7b9b6",
    marginLeft: 25,
    marginRight: 25,
    borderRadius: 20,
    padding: 15,
    marginBottom: 10
  }
});

export default Plan;
