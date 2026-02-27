import React from "react";
import { Button, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";
import "react-native-gesture-handler";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const AnimatedCircle = Animated.createAnimatedComponent(Circle); // Making a custom animated component to handle its animation with props , the component is a circle that can get r as props

export default function CounterScreen() {
  const r = useSharedValue<number>(20);
  const pressed = useSharedValue<boolean>(false);
  const pressed2 = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed2.value = true;
    })
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
      pressed2.value = false;
    });

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const handlePress = () => {
    r.value += 10; // On button press increasing r by 10
  };

  // highlight-start
  const animatedProps = useAnimatedProps(() => ({
    // Using animated props to transform r to its new value with timing
    r: withTiming(r.value),
  }));
  // highlight-end

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? "#FFE04B" : "#B58DF1", // Animated style changes background color when button pressed
    transform: [{ scale: withTiming(pressed.value ? 1.2 : 1) }], // Animated styles transform (Scale) with timing
  }));

  const animatedStylesPan = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { scale: withTiming(pressed2.value ? 1.2 : 1) },
    ],
    backgroundColor: pressed2.value ? "#FFE04B" : "#b58df1",
  }));

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <AnimatedCircle
          cx="50%"
          cy="50%"
          fill="#b58df1"
          // highlight-next-line
          // Passing r with animated props that is taken by custom animated component and passed to the circle inside it
          animatedProps={animatedProps}
        />
      </Svg>
      <Button onPress={handlePress} title="Click me" />
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={tap}>
          {/*Its like handle click that makes a boolean true false when its taped*/}
          <Animated.View style={[styles.circle, animatedStyles]} />
        </GestureDetector>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.circle2, animatedStylesPan]} />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  svg: {
    height: 250,
    width: "100%",
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
    marginTop: 46,
  },
  circle2: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 500,
    marginTop: 46,
  },
});
