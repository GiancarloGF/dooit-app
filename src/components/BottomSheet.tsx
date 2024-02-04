import GorhomBottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback, useMemo } from "react";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  children: React.ReactNode;
  buttonSheetRef: React.Ref<BottomSheetMethods>;
  snapPoints?: BottomSheetProps["snapPoints"];
  onClose?: () => void;
};
const BottomSheet: React.FC<Props> = (props) => {
  const { children, buttonSheetRef, onClose } = props;
  const backgroundColor = useThemeColor(undefined, "background");

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

  const snapPointsValues = useMemo(() => ["50%"], []);

  return (
    <GorhomBottomSheet
      ref={buttonSheetRef}
      //   ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPointsValues}
      enablePanDownToClose
      animationConfigs={animationConfigs}
      backdropComponent={renderBackdrop}
      //   onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor }}
      onClose={onClose}
      keyboardBehavior="fillParent"
      //   handleStyle={{
      //     backgroundColor,
      //     borderTopLeftRadius: 15,
      //     borderTopRightRadius: 15,
      //   }}
    >
      {/* <View style={[styles.contentContainer]}>{children}</View> */}
      {children}
    </GorhomBottomSheet>
  );
};

export default BottomSheet;
