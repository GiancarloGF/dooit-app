import React from "react";
import {
  Modal as RNModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  onDismiss: () => void;
};
const Modal: React.FC<Props> = ({ children, visible, onDismiss }) => {
  return (
    <RNModal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={() => onDismiss()}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback>
            <View style={styles.modalInner}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalInner: {
    width: "90%",
    // height: 200,
    // padding: 35,
    // justifyContent: "space-around",
    // alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
});
