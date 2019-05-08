import React from "react";
import {
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated
} from "react-native";

export default class Title extends React.Component {
  render() {
    const { item, animatedTitleStyle, handlePress } = this.props;
    return (
      <Animated.View style={[styles.titleContainer, animatedTitleStyle]}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <Image
            style={styles.backButton}
            source={require("../assets/back.png")}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.title}>{item.title}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: -20,
    zIndex: 99
  },
  backButton: {
    height: 24,
    resizeMode: "contain"
  },
  title: {
    color: "#fafafa",
    left: -20,
    fontSize: 24,
    fontWeight: "700",
    textAlignVertical: "center"
  }
});
