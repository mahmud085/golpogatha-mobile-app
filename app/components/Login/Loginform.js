import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { AuthContext } from "./../../../App";
import { useNavigation } from "@react-navigation/native";

export default function Loginform() {
  let passwordInput = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { logIn } = React.useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        onSubmitEditing={() => passwordInput.focus()}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="go"
        ref={(input) => (passwordInput = input)}
        secureTextEntry
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => logIn({ email: username, password: password })}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpArea}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signUpText}>Don't have an account yet? </Text>
        <Text style={[styles.signUpText, styles.signUpLink]}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 40,
  },
  input: {
    height: 40,
    backgroundColor: "#444",
    opacity: 0.8,
    borderRadius: 5,
    color: "#FFF",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
  signUpArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    marginTop: 10,
    color: "black",
  },
  signUpLink: {
    textDecorationLine: "underline",
  },
});
