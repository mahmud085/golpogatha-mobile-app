import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Constants from "expo-constants";

import StoryList from "./app/components/Story/StoryList";
import Story from "./app/components/Story/Story";
import WriteStory from "./app/components/Story/WriteStory";
import Login from "./app/components/Login/Login";
import SignUp from "./app/components/SignUp/SignUp";
import BASE_URI from "./config";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AuthContext = React.createContext();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "LOG_IN":
          return {
            ...prevState,
            isLogout: false,
            userToken: action.token,
          };
        case "LOG_OUT":
          return {
            ...prevState,
            isLogout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isLogout: false,
      userToken: null,
    }
  );

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let accessToken;

  //     try {
  //       accessToken = await AsyncStorage.getItem("token");
  //       dispatch({ type: "RESTORE_TOKEN", token: accessToken });
  //     } catch (e) {
  //       // Restoring token failed
  //     }
  //   };

  //   bootstrapAsync();
  // }, []);

  const authContext = React.useMemo(
    () => ({
      logIn: async (data) => {
        axios
          .post(`${BASE_URI}/users/user/login`, data)
          .then(async function (response) {
            await AsyncStorage.setItem("token", response.data.data.accessToken);
            dispatch({ type: "LOG_IN", token: response.data.data.accessToken });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      logOut: () => dispatch({ type: "LOG_OUT" }),
      signUp: async (data) => {
        axios
          .post(`${BASE_URI}/users/user/register`, data)
          .then(async function (response) {
            await AsyncStorage.setItem("token", response.data.data.accessToken);
            dispatch({ type: "LOG_IN", token: response.data.data.accessToken });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    }),
    []
  );
  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#2F95D6",
      marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    },
    headerTintColor: "white",
    headerTitleAlign: "center",
  };
  const SigninSignupStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
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

  const StoriesStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="Home"
          component={StoryList}
          options={{ title: "Stories" }}
        />
        <Stack.Screen name="Story" component={Story} />
        <Stack.Screen name="Write Story" component={WriteStory} />
      </Stack.Navigator>
    );
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <SigninSignupStackNavigator />
        ) : (
          <Drawer.Navigator>
            <Drawer.Screen name="Stories" component={StoriesStackNavigator} />
            <Drawer.Screen name="Write Story" component={WriteStory} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
