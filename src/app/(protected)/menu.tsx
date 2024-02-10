import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ViewThemed } from "@/components/ViewThemed";

const UserMenuScreen = () => {
  const router = useRouter();
  return (
    <ViewThemed style={styles.mainView}>
      <Stack.Screen
        // name="menu"

        options={{
          presentation: "modal",
          title: "Menú de usuario",
          headerTitleAlign: "left",
          animationTypeForReplace: "push",
          headerLeft: () => <View style={{ width: 2 }} />,
          headerRight: () => (
            <Text
              onPress={() => router.back()}
              style={{
                color: "white",
                fontSize: 18,
                marginRight: 10,
              }}
            >
              Cerrar
            </Text>
          ),
        }}
      />
      <Text>UserMenuScreen</Text>
    </ViewThemed>
  );
};

export default UserMenuScreen;

const styles = StyleSheet.create({
  mainView: { flex: 1, padding: 10 },
});
