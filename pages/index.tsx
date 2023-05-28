import { View, Text, StyleSheet, Touchable } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Canvas,
  Circle,
  Rect,
  RoundedRect,
  Text as SkiaText,
  rect,
  rrect,
  useClockValue,
  useComputedValue,
  useFont,
} from "@shopify/react-native-skia";
import { screenHeight, screenWidth } from "../utils/constants";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const islandHeight = 30;
const islandWidth = 120;
const islandInsetY = 16;

const MainPage = () => {
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(0);
  const font = useFont(require("../assets/fonts/inter.ttf"), 16);
  const circleRadius = 50;
  const animatedCircleRadius = useSharedValue(0);
  const animatedCirclePositionY = useSharedValue(islandInsetY);
  const canvasWidth = 200;
  const clock = useClockValue();

  function add() {
    animatedCirclePositionY.value = screenHeight/3 
    animatedCircleRadius.value = circleRadius 
    setCount((p) => ++p);
  }

  function subtract() {
    animatedCirclePositionY.value = islandInsetY
    animatedCircleRadius.value = 0
    setCount((p) => --p);
  }

  function onPressDone() {}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={subtract}>
          <Text style={{ fontSize: 24 }}>-</Text>
        </TouchableOpacity>

        {/* <View
          style={{
            backgroundColor: "black",
            borderRadius: "100%",
            height: 100,
            width: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>{count}</Text>
        </View> */}

        <Canvas style={{ width: 200, height: screenHeight }}>
          <RoundedRect
            r={30}
            height={islandHeight}
            width={islandWidth}
            y={islandInsetY}
            x={canvasWidth / 2 - islandWidth / 2}
          />

          <Circle
            r={animatedCircleRadius}
            origin={{ x: 0, y: 0 }}
            cx={canvasWidth / 2}
            cy={animatedCirclePositionY}
          />

          <Circle
            r={circleRadius}
            origin={{ x: 0, y: 0 }}
            cx={canvasWidth / 2}
            cy={screenHeight / 2}
          />
          <SkiaText
            font={font!}
            text={count.toString()}
            y={screenHeight / 2 + 5}
            x={canvasWidth / 2 - 5}
            color={"white"}
          />
        </Canvas>

        <TouchableOpacity onPress={add} style={{}}>
          <Text style={{ fontSize: 24 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
