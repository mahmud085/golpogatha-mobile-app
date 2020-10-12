import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StoriesStackNavigator, CategoriesStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        tabStyle: {
          justifyContent: "center",
        },
      }}
    >
      <Tab.Screen name="CategoriesTab" component={CategoriesStackNavigator} options={{ title: "Categories" }}/>
      <Tab.Screen name="StoriesTab" component={StoriesStackNavigator} options={{ title: "Stories" }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
