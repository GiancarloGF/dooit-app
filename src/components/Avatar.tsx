import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  negative?: boolean;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
const Avatar: React.FC<Props> = ({
  negative = false,
  size = 45,
  containerStyle = {},
  textStyle = {},
}) => {
  const backgroundColor = useThemeColor(
    undefined,
    negative ? "backgroundAccent" : "background",
  );
  const color = useThemeColor(undefined, negative ? "textAccent" : "text");
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: 100,
          // padding: 10,
          backgroundColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <Text
        style={[
          {
            color,
            fontFamily: "ComfortaaBold",
          },
          textStyle,
        ]}
      >
        GG
      </Text>
    </View>
  );
};

export default Avatar;
