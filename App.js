import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./app/components/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
export const AuthContext = React.createContext();
import axios from "axios";
import StoryList from "./app/components/Story/StoryList";
import Story from "./app/components/Story/Story";
import WriteStory from "./app/components/Story/WriteStory";
const Stack = createStackNavigator();

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

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let accessToken;

      try {
        accessToken = await AsyncStorage.getItem("token");
        dispatch({ type: "RESTORE_TOKEN", token: accessToken });
      } catch (e) {
        // Restoring token failed
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      logIn: async (data) => {
        axios
          .post(
            "https://us-central1-golpogatha-3a33c.cloudfunctions.net/webApi/api/v1/users/user/login",
            data
          )
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
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name="Login" component={Login} />
          ) : (
            <>
              <Stack.Screen name="Home" component={StoryList} />
              <Stack.Screen name="Story" component={Story} />
              <Stack.Screen name="WriteStory" component={WriteStory} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
