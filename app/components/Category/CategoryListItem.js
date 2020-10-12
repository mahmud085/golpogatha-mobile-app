import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Dimensions , TouchableOpacity} from "react-native";
const { width, height } = Dimensions.get("window");
const CategoryListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
  <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("StoriesTab", { category: item.name })}>
    <View>
        <Text>{item.name}</Text>
    </View>
  </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin:5,
    width: width / 2 - 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffcccc",
  },
});
export default CategoryListItem;
