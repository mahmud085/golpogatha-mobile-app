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
          source={require("../../assets/demo-reading.jpg")}
        />
        <View style={styles.storyDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>
              By {item.username.split("@")[0]}
            </Text>
          <View style={styles.bottomContainer}>
          <Text style={styles.category}>{item.category}</Text>

            <View style={styles.reactionContainer}>
              <View style={styles.loveReact}>
                <Image
                  style={styles.reactionImage}
                  source={require("../../assets/love.png")}
                />
                <Text style={styles.reactCount}>{item.loveCount}</Text>
              </View>
              <View style={styles.comment}>
                <Image
                  style={styles.reactionImage}
                  source={require("../../assets/comment.png")}
                />
                <Text style={styles.reactCount}>{item.commentCount}</Text>
              </View>
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
    borderRadius: width * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    margin: 10,
  },
  image: {
    height: width * 0.4,
    borderTopRightRadius: width * 0.02,
    borderTopLeftRadius: width * 0.02,
    resizeMode: "cover",
  },
  title: {
    color: "black",
    fontSize: 15,
    fontFamily: "sans-serif",
    flexShrink: 1,
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
  },
  reactionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  author: { marginVertical: 5, fontWeight: "400", color: "gray",},
  category: { marginBottom: 5, fontWeight: "400", color: "gray", width: "70%"  },
  loveReact: {
    flex: 1,
    flexDirection: "row",
  },
  comment: {
    flex: 1,
    flexDirection: "row",
  },
  reactionImage: {
    width: 20,
    height: 25,
    marginHorizontal: 5,
  },
  reactCount: {
    fontSize: 17,
    color: "gray",
  },
  storyDetails: {
    margin: 10,
  },
});
