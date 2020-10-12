import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import StoryList from "./app/components/Story/StoryList";
import Story from "./app/components/Story/Story";
import WriteStory from "./app/components/Story/WriteStory";

import BASE_URI from "./config";
import BottomTabNavigator from "./app/navigation/TabNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CategoryList from "./app/components/Category/CategoryList";
import {
  StoriesStackNavigator,
  SigninSignupStackNavigator,
} from "./app/navigation/StackNavigator";

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

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {state.userToken == null ? (
            <SigninSignupStackNavigator />
          ) : (
            <Drawer.Navigator>
              <Drawer.Screen name="Home" component={BottomTabNavigator} />
              <Drawer.Screen name="Stories" component={StoriesStackNavigator} />
            </Drawer.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
