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
import Home from "./Home.jsx";
import Plan from "./Plan.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Plan"
          component={Plan}
          options={{ title: "Study Plan" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
