import React from "react";
import { View } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

import DetailScreen from "./screens/DetailScreen";
import ListScreen from "./screens/ListScreen";

const Router = createSwitchNavigator(
  {
    List: { screen: ListScreen },
    Detail: { screen: DetailScreen }
  },
  {
    initialRouteName: "List"
  }
);

const AppContainer = createAppContainer(Router);

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
      </View>
    );
  }
}
