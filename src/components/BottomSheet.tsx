import { useThemeColor } from "@/hooks/useThemeColor";
import GorhomBottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  content: React.ReactNode;
  buttonSheetRef: React.Ref<BottomSheetMethods>;
};
const BottomSheet: React.FC<Props> = (props) => {
  const { content, buttonSheetRef } = props;
  const backgroundColor = useThemeColor(null, "background");

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        pressBehavior="close"
        {...props}
      />
    ),
    [],
  );

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 300,
  });

  const snapPoints = useMemo(() => ["60%"], []);

  return (
    <GorhomBottomSheet
      ref={buttonSheetRef}
      //   ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      animationConfigs={animationConfigs}
      backdropComponent={renderBackdrop}
      //   onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor }}
      //   handleStyle={{
      //     backgroundColor,
      //     borderTopLeftRadius: 15,
      //     borderTopRightRadius: 15,
      //   }}
    >
      <View style={[styles.contentContainer]}>{content}</View>
    </GorhomBottomSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
