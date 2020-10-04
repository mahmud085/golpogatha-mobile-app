import React from "react";
import { StyleSheet, Text, Image, View, Button } from "react-native";
import Loginform from "./Loginform";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
        <Text style={styles.title}>A story telling platform</Text>
      </View>
      <View style={styles.formContainer}>
        <Loginform />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    marginLeft: 20,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {},
  title: {
    color: "black",
    marginTop: 10,
    textAlign: "center",
    opacity: 0.8,
  },
});
