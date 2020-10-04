import React, { useEffect, useState } from "react";
import { Button, Text, View, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import StoryListItem from "./StoryListItem";

const _getStorageValue = async () => {
  var value = await AsyncStorage.getItem("token");
  return value;
};
const StoryList = () => {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          "https://us-central1-golpogatha-3a33c.cloudfunctions.net/webApi/api/v1/stories",
          {
            headers: {
              authorization: "Bearer " + (await AsyncStorage.getItem("token")),
            },
          }
        )
        .then(function (response) {
          console.log("stories", response.data);
          setStories(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={stories}
        renderItem={({item}) => <StoryListItem item={item} />}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

export default StoryList;
