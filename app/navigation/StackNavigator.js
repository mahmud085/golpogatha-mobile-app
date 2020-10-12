import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Login/Login";
import SignUp from "../components/SignUp/SignUp";
import StoryList from "../components/Story/StoryList";
import CategoryList from '../components/Category/CategoryList';
import Story from "../components/Story/Story";
import WriteStory from "../components/Story/WriteStory";
import Constants from "expo-constants";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "black",
  headerTitleAlign: "center",
  
};

const SigninSignupStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{screenOptionStyle, headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Sign In" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Sign Up" }}
      />
    </Stack.Navigator>
  );
};

const StoriesStackNavigator = ({route}) => {
  const navigation = useNavigation();
  const category = route.params?.category;
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={() => <StoryList category={category} />}
        options={({ navigation }) => ({
          title: "Stories",
          headerLeft: () => (
            <Icon name="menu" size={35} onPress={() => navigation.toggleDrawer()} />
          ),
        })}
      />
      <Stack.Screen name="Story" component={Story} />
      <Stack.Screen name="Write Story" component={WriteStory} />
    </Stack.Navigator>
  );
};

const CategoriesStackNavigator = () => {

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Categories"
        component={CategoryList}
        options={({ navigation }) => ({
          title: "Categories",
          headerLeft: () => (
            <Icon name="menu" size={35} onPress={() => navigation.toggleDrawer()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export { StoriesStackNavigator, SigninSignupStackNavigator, CategoriesStackNavigator };
