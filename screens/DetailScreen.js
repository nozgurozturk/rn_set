import React from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";

import Card from "../components/Card";
import Abstract from "../components/Abstract";
import Title from "../components/Title";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class DetailScreen extends React.Component {
  state = {
    size: new Animated.ValueXY(),
    positions: new Animated.ValueXY(),
    textAnimation: new Animated.Value(0),
    animation: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.textAnimation, {
      toValue: 1,
      duration: 400
    }).start();
  }

  _onPress = () => {
    const prevPos = this.props.navigation.getParam("prevPos", "NO-DATA");
    const scrollY = this.props.navigation.getParam("scrollY", "NO-DATA");

    Animated.parallel([
      Animated.timing(this.state.positions.y, {
        toValue: prevPos.y,
        duration: 400
      }),
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 400
      }),
      Animated.timing(this.state.textAnimation, {
        toValue: 0,
        duration: 400
      })
    ]).start(() => {
      this.props.navigation.navigate("List", { scrollY: scrollY });
    });
  };

  render() {

    const item = this.props.navigation.getParam("item", "NO-DATA");

    const animatedText = this.state.textAnimation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [SCREEN_HEIGHT, 0, 0]
    });
    const animatedTag = this.state.animation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [0, 20, 20]
    });
    const animatedTagPosition = this.state.animation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [-60, 40, 40]
    });
    const animatedTitlePos = this.state.textAnimation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [0, 40, 40]
    });
    const animatedTextStyle = {
      opacity: this.state.textAnimation,
      transform: [{ translateY: animatedText }]
    };
    const animatedImageStyle = {
      borderRadius: animatedTag
    };
    const animatedTitleStyle = {
      opacity: this.state.textAnimation,
      top: animatedTitlePos
    };
    const animatedCardStyle = {
      left: this.state.positions.x,
      top: this.state.positions.y,
      padding: animatedTag
    };
    const animatedTagStyle = {
      bottom: animatedTagPosition,
      left: animatedTag
    };

    return (
      <ScrollView>
        <Title
          item={item}
          animatedTitleStyle={animatedTitleStyle}
          handlePress={() => this._onPress()}
        />
        <Card
          item={item}
          animatedCardStyle={animatedCardStyle}
          animatedTagStyle={animatedTagStyle}
          animatedImageStyle={animatedImageStyle}
        />

        <Abstract
          item={item}
          animatedTextStyle={animatedTextStyle}
        />
      </ScrollView>
    );
  }
}

