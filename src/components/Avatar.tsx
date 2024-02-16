import React from "react";
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  negative?: boolean;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  initialsFrom?: string;
};
const Avatar: React.FC<Props> = ({
  negative = false,
  size = 40,
  containerStyle = {},
  textStyle = {},
  initialsFrom,
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
            fontSize: size * 0.4,
          },
          textStyle,
        ]}
      >
        {initialsFrom?.slice(0, 1).toUpperCase()}
      </Text>
    </View>
  );
};

export default Avatar;
