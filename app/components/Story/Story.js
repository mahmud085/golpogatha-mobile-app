import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

export default function Story({ route }) {
  const { story } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.content}>{story.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
    borderColor: "red",
    borderBottomWidth: 2,
  },
  content: {
    margin: 10,
    textAlign: "justify",
  },
});
