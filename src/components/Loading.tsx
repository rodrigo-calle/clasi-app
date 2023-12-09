import React from "react";
import { Text, View } from "react-native";
import { LoadingProp } from "../types/props";

const Loading = (props: LoadingProp) => {
  const { text, open } = props;
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        display: open ? "flex" : "none",
      }}
    >
      {open ? (
        <View
          style={{
            width: 300,
            height: 250,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {text ? text : "Cargando..."}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Loading;
