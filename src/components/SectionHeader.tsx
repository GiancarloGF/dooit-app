import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
};
const SectionHeader: React.FC<Props> = ({ name }) => {
  return (
    <View style={styles.sectionHeader}>
      {/* <Feather name="folder" size={28} color={Colors.primary} /> */}
      <Text style={styles.sectionName}>{name}</Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    marginVertical: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  sectionName: { fontSize: 28 },
});
