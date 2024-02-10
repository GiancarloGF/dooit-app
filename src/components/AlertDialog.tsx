import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "./Button";

import Colors from "@/constants/Colors";

type Props = {
  onConfirm: () => void;
  onDismiss: () => void;
  title: string;
  description?: string;
  confirmButtonLabel?: string;
  dismissButtonLabel?: string;
};
const AlertDialog: React.FC<Props> = ({
  onConfirm,
  onDismiss,
  title,
  description,
  confirmButtonLabel = "Confirmar",
  dismissButtonLabel = "Cancelar",
}) => {
  return (
    <View style={styles.modalContentContainer}>
      <Text style={styles.modalTitle}>{title}</Text>
      {description && (
        <Text style={styles.modalDescription}>{description}</Text>
      )}
      <View style={styles.modalActionButtonsContainer}>
        <Button
          label={dismissButtonLabel}
          style={styles.modalActionButton}
          labelColor={Colors.secondary}
          onPress={onDismiss}
        />
        <Button
          label={confirmButtonLabel}
          style={[styles.modalActionButton, { backgroundColor: "#ED3D5C" }]}
          labelColor={Colors.secondary}
          onPress={onConfirm}
        />
      </View>
    </View>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  modalContentContainer: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // width: "90%",
  },
  modalActionButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  modalActionButton: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  modalTitle: {
    color: Colors.primary,
    fontSize: 19,
    // fontWeight: "bold",
    fontFamily: "ComfortaaBold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalDescription: {
    color: Colors.primary,
    fontSize: 14,
  },
});
