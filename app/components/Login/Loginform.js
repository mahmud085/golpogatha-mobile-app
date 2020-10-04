import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { AuthContext } from "./../../../App";

export default function Loginform() {
  let passwordInput = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { logIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="username or email"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        onSubmitEditing={() => passwordInput.focus()}
        onChangeText={(username) => setUsername(username)}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#FFF",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
});
