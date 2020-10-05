import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import BASE_URI from "./../../../config";

export default function WriteStory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("fantasy");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const data = {
      title,
      content,
      category,
    };
    axios
      .post(`${BASE_URI}/stories/publish`, data, {
        headers: {
          authorization: "Bearer " + (await AsyncStorage.getItem("token")),
        },
      })
      .then(function (response) {
        navigation.navigate("Story", { story: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <TextInput
          style={styles.title}
          onChangeText={(title) => setTitle(title)}
          value={title}
          placeholder="Insert story title!"
        />
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
        >
          <Picker.Item label="Fantasy" value="FANTASY" />
          <Picker.Item label="Thriller" value="THRILLER" />
          <Picker.Item label="Horror" value="HORROR" />
          <Picker.Item label="Fiction" value="FICTION" />
          <Picker.Item label="Romance" value="ROMANCE" />
          <Picker.Item label="Adventure" value="ADVENTURE" />
          <Picker.Item label="Action" value="ACTION" />
        </Picker>
      </View>
      <View style={styles.writingSection}>
        <TextInput
          style={styles.content}
          multiline
          onChangeText={(content) => setContent(content)}
          value={content}
          placeholder="Write your thoughts here!"
        />
      </View>
      <View style={styles.submitSection}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleSection: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  title: {
    height: 40,
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },

  writingSection: {
    flex: 8,
    margin: 10,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 5,
  },
  content: {
    padding: 5,
    color: "black",
  },
  submitSection: {
    flex: 1,
    padding: 10,
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
  picker: {
    width: "50%",
    borderBottomColor: "red",
    borderBottomWidth: 1,
    marginLeft: 10,
  },
});
