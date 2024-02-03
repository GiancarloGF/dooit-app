import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useSession } from "../../providers/session_provider";

const HomeScreen = () => {
  const { signOut } = useSession();
  return (
    <View style={styles.mainView}>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Dooit App",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          // headerStyle: { backgroundColor: "#f4511e" },
          // headerTintColor: "#fff",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          // },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Text>Home Screen</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainView: { flex: 1, justifyContent: "center", alignItems: "center" },
});
