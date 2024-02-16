import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";
// import { StyleSheet } from "react-native";

const DocumentItemsSkeleton = ({ show }: { show: boolean }) => {
  return (
    <>
      {show ? (
        <View style={{ display: "flex", gap: 10 }}>
          <Skeleton height={80} width="100%" colorMode="light" />

          <Skeleton height={80} width="100%" colorMode="light" />
          <Skeleton height={80} width="100%" colorMode="light" />
        </View>
      ) : null}
    </>
  );
};

export default DocumentItemsSkeleton;

// const styles = StyleSheet.create({});
