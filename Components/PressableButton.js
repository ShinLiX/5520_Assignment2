import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PressableButton({
  children,
  pressedFunction,
  componentStyle,
  pressedStyle,
}) {
  return (
    <Pressable
      onPress={pressedFunction}
      //android_ripple={{color: "red"}}
      style={({pressed}) => {
        return [
            styles.defaultStyle,
            componentStyle,
            pressed && styles.defaultPressedStyle,
            pressed && pressedStyle,
        ];}
      }>
      <View>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: "beige",
    padding: 0,
    margin: 0,
    borderRadius: 5,
  },
  defaultPressedStyle: {
    backgroundColor: "#a4a",
    opacity: 0.2,
  },
});