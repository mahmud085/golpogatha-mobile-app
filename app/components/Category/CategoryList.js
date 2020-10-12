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

import { useNavigation } from "@react-navigation/native";
import BASE_URI from "../../../config";
import CategoryListItem from "./CategoryListItem";
import { SafeAreaView } from "react-native-safe-area-context";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  async function fetchCategories() {
    axios
      .get(`${BASE_URI}/stories/category/all`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: "Bearer " + (await AsyncStorage.getItem("token")),
        },
      })
      .then(function (response) {
        // console.log("Categories ", response.data.data);
        setCategories(response.data.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCategories();
    });

    return unsubscribe;
  }, [navigation]);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
      <FlatList
        style={styles.itemContainer}
        data={categories}
        renderItem={({ item }) => <CategoryListItem item={item} />}
        keyExtractor={(item, index) => index}
        numColumns={2}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
},
itemContainer: {    
},
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
export default CategoryList;
