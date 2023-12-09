import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { CameraButtonProps } from "../types/props";

const CameraButton = ({ title, onPress, icon, color }: CameraButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Entypo name={icon} size={24} color={color ? color : "#f1f1f1"} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  text: {
    color: "#f1f1f1",
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    border: "1px solid #000",
  },
});
