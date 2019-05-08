import React from "react";
import { Text, StyleSheet, View, Animated } from "react-native";

export default class Abstract extends React.Component {
  render() {
    const { item, animatedTextStyle } = this.props;
    return (
      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.authorText}>Photo by {item.author} from Unsplash</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 60,
    padding: 20
  },
  text: {
    fontSize: 18,
    fontWeight: "500"
  },
  authorText: {
    marginTop:20,
    fontSize: 18,
    fontWeight: "700"
  }
});
