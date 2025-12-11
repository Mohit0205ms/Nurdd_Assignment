import React from "react";
import { TextInput, StyleSheet, TextInputProps, View } from "react-native";

export default function Input(props: TextInputProps & { style?: any }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <TextInput
        placeholderTextColor="#8b8b92"
        style={[styles.input, props.style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#0f0f12",
    borderRadius: 12,
    padding: 14,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#19171a",
  },
});
