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
    width: width / 2 - 15,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: width * 0.05,
    elevation: 5,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 1, width: 1 },
  },
});
export default CategoryListItem;
