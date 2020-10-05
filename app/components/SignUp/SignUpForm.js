import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { AuthContext } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import Login from "./../Login/Login";

export default function SignUpForm() {
  let passwordInput = useRef(null);
  let emailInput = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = React.useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        onSubmitEditing={() => emailInput.focus()}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        ref={(input) => (emailInput = input)}
        onSubmitEditing={() => passwordInput.focus()}
        onChangeText={(email) => setEmail(email)}
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
        onPress={() => signUp({ email: email, password: password })}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signInArea}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.signInText}>Already registered? </Text>
        <Text style={[styles.signInText, styles.signInLink]}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20,
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
  signInArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signInText: {
    marginTop: 10,
    color: "black",
  },
  signInLink: {
    textDecorationLine: "underline",
  },
});
