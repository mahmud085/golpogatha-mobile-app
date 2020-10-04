import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function StoryListItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Story", { story: item })}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/golpogatha.png")}
        />
        <View style={styles.storyDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.username}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <View style={styles.reactionContainer}>
            <View style={styles.loveReact}>
              <Image
                style={styles.reactionImage}
                source={require("../../assets/love.png")}
              />
              <Text>{item.loveCount}</Text>
            </View>
            <View style={styles.comment}>
              <Image
                style={styles.reactionImage}
                source={require("../../assets/comment.png")}
              />
              <Text>{item.commentCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: width * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  title: {
    color: "black",
    fontSize: 15,
    fontFamily: "sans-serif",
    flexShrink: 1,
  },
  reactionContainer: {
    flex: 1,
    flexDirection: "row",
  },
  author: { marginVertical: 5, fontWeight: "400", color: "gray" },
  category: { marginBottom: 5, fontWeight: "400", color: "gray" },
  loveReact: {
    flex: 1,
    flexDirection: "row",
  },
  comment: {
    flex: 1,
    flexDirection: "row",
  },
  reactionImage: {
    width: 15,
    height: 20,
    marginHorizontal: 15,
  },
  storyDetails: {
    margin: 10,
  },
});
