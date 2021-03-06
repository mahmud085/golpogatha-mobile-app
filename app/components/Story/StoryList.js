import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import StoryListItem from "./StoryListItem";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BASE_URI from "./../../../config";
import { SafeAreaView } from "react-native-safe-area-context";

const StoryList = ({category}) => {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  async function fetchData() {
    axios
      .get(`${BASE_URI}/stories`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: "Bearer " + (await AsyncStorage.getItem("token")),
        },
      })
      .then(function (response) {
        if(category !== undefined)
        setStories(response.data.data.filter(story => story.category.toLowerCase() === category.toLowerCase()));
        else
        setStories(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return isLoading ? (
    <View style={{flex: 1, justifyContent: "center"}}>
      <ActivityIndicator size="large" color="#F44336" />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={({ item }) => <StoryListItem item={item} />}
        keyExtractor={(item, index) => item.id}
      />
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Write Story")}
      >
        <Animated.View style={styles.button}>
          <AntDesign name="plus" size={30} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  button: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#F02A4B",
    backgroundColor: "#F02A4B",
    opacity: 0.8,
    shadowOpacity: 0.3,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 35,
    right: 20,
    zIndex: 100,
  },
});
export default StoryList;
