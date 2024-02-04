import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  type: "Carpeta" | "Libreta";
  name: string;
};

const HeaderTitle: React.FC<Props> = ({ name, type }) => {
  return (
    <View style={styles.headerTitle}>
      <Text style={styles.headerTitleType}>{type}</Text>
      <Text style={styles.headerTitleName}>{name}</Text>
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  headerTitle: {
    display: "flex",
    flexDirection: "column",
  },
  headerTitleType: {
    color: "#fff",
    fontSize: 10,
  },
  headerTitleName: {
    color: "#fff",
    fontSize: 18,
  },
});
