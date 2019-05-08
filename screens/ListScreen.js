import React from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  FlatList
} from "react-native";

import Card from "../components/Card";

import DATA from "../assets/data";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class ListScreen extends React.Component {
  state = {
    activeCard: null,
    positions: new Animated.ValueXY(),
    animation: new Animated.Value(0),
    scrollPosistion: 0
  };

  componentDidMount() {
    const scrollY = this.props.navigation.getParam("scrollY", 0);
    if (scrollY !== 0) {
      this.refs.scrollView.scrollTo({
        y: scrollY,
        animated: false
      });
    }
  }
  componentWillMount() {
    this.allCards = {};
    this.prevPosition = {};
  }

  _onScroll = e => {
    this.state.scrollPosistion = e.nativeEvent.contentOffset.y;
  };

  _onPress = (item, i) => {
    this.allCards[i].measure((x, y, width, height, pageX, pageY) => {
      this.prevPosition.y = pageY;
      this.state.positions.setValue({
        y: pageY
      });
      this.setState({ activeCard: DATA[i] }, () => {
        this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
          Animated.parallel([
            Animated.timing(this.state.positions.y, {
              toValue: dPageY,
              duration: 400
            }),
            Animated.timing(this.state.animation, {
              toValue: 1,
              duration: 400
            })
          ]).start(() => {
            this.props.navigation.navigate("Detail", {
              item: item,
              prevPos: this.prevPosition,
              scrollY: this.state.scrollPosistion
            });
          });
        });
      });
    });
  };

  _renderOverlay = () => {
    const animatedPaddingAndRadius = this.state.animation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [20, 0, 0]
    });
    const animatedTag = this.state.animation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [40, -60, -60]
    });
    const animatedImageStyle = {
      borderRadius: animatedPaddingAndRadius
    };
    const animatedCardStyle = {
      top: this.state.positions.y,
      padding: animatedPaddingAndRadius
    };
    const animatedTagStyle = {
      bottom: animatedTag,
      left: animatedPaddingAndRadius
    };

    if (this.state.activeCard) {
      return (
        <View style={StyleSheet.absoluteFill}>
          <View ref={view => (this.viewImage = view)}>
            <Card
              item={this.state.activeCard}
              animatedCardStyle={animatedCardStyle}
              animatedTagStyle={animatedTagStyle}
              animatedImageStyle={animatedImageStyle}
            />
          </View>
        </View>
      );
    }
  };
  render() {
    const animatedPositions = this.state.animation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [0, -SCREEN_WIDTH, -SCREEN_WIDTH]
    });
    const animatedOpacity = this.state.animation.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [1, 0, 0]
    });
    const animatedContentStyle = [
      {
        transform: [
          {
            translateY: animatedPositions
          }
        ],
        opacity: animatedOpacity
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          onScroll={e => this._onScroll(e)}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          ref="scrollView"
        >
          <FlatList
            renderItem={({ item, index }) => (
              <TouchableWithoutFeedback
                onPress={() => this._onPress(item, index)}
                key={item.id}
              >
                <View ref={item => (this.allCards[index] = item)}>
                  <Card item={item} animatedCardStyle={animatedContentStyle} />
                </View>
              </TouchableWithoutFeedback>
            )}
            data={DATA}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
        {this._renderOverlay()}
      </View>
    );
  }
}
