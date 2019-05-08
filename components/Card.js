import React from "react";
import { Text, Image, Dimensions, StyleSheet, Animated } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class Card extends React.Component {
  render() {
    const {
      item,
      animatedCardStyle,
      animatedTagStyle,
      animatedImageStyle
    } = this.props;
    return (
      <Animated.View style={[styles.card, animatedCardStyle]}>
        <Animated.Image
          source={{
            uri: item.uri,
            cache: "default"
          }}
          style={[styles.image, animatedImageStyle]}
        />  
        <Animated.View style={[styles.priceTag, animatedTagStyle]}>
          <Text style={styles.price}>${item.price}</Text>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2.2,
    padding: 20
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 20
  },
  priceTag: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 50,
    bottom: 40,
    left: 20,
    backgroundColor: "#1a1a1a",
    opacity: 0.9,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  price: {
    color: "#fafafa",
    fontSize: 20,
    fontWeight: "500",
    textAlignVertical: "center"
  }
});
