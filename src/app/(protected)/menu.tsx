import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

import Avatar from "@/components/Avatar";
import { Text } from "@/components/Text";
import { ViewThemed } from "@/components/ViewThemed";
import Colors from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/providers/session_provider";

const UserMenuScreen = () => {
  const router = useRouter();
  const { signOut } = useSession();
  return (
    <ViewThemed style={styles.mainView}>
      <Stack.Screen
        // name="menu"

        options={{
          presentation: "modal",
          title: "Menú",
          headerTitleAlign: "left",
          animationTypeForReplace: "push",
          animation: "slide_from_bottom",
          animationDuration: 50,
          headerLeft: () => <View style={{ width: 2 }} />,
          headerRight: () => (
            <Text
              onPress={() => router.back()}
              style={{
                color: "white",
                fontSize: 16,
                marginRight: 10,
              }}
            >
              Cerrar
            </Text>
          ),
        }}
      />
      <View style={styles.userInfoContainer}>
        <Avatar negative size={60} />
        <View style={styles.userAccessData}>
          <Text style={styles.userName}>Giancarlo Guerra Farfán</Text>
          <Text style={styles.userEmail}>gian.guerra23@gmail.com</Text>
        </View>
      </View>

      <View style={styles.sectionList}>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionItemName}>Configuración</Text>
          <View style={styles.sectionItemOptions}>
            <MenuOption
              name="Cambiar contraseña"
              icon="lock"
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={styles.sectionItem}>
          <Text style={styles.sectionItemName}>Personalización</Text>
          <View style={styles.sectionItemOptions}>
            <MenuOption
              name="Modo oscuro (in Progress)"
              icon="moon"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <MenuOption
        name="Cerrar sesión"
        icon="log-out"
        onPress={() => signOut()}
      />
    </ViewThemed>
  );
};

export default UserMenuScreen;

type MenuOptionProps = {
  name: string;
  icon: React.ComponentProps<typeof Feather>["name"];
  onPress: () => void;
};
const MenuOption: React.FC<MenuOptionProps> = ({ name, onPress, icon }) => {
  const textColor = useThemeColor(undefined, "text");
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={Colors.ternary}
      style={{
        paddingHorizontal: 5,
        borderRadius: 5,
      }}
    >
      <View style={styles.menuOption}>
        <Feather name={icon} size={24} color={textColor} />
        <Text style={styles.menuOptionName}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainView: { flex: 1, padding: 20 },
  userInfoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  userAccessData: {},
  userName: {
    fontSize: 18,
    fontFamily: "ComfortaaBold",
  },
  userEmail: {
    color: "#CBD5E1",
  },
  sectionList: {},
  sectionItem: {
    marginVertical: 10,
  },
  sectionItemName: {
    fontSize: 18,
    color: Colors.ternary,
  },
  sectionItemOptions: {
    paddingLeft: 10,
  },
  menuOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  menuOptionName: {
    fontSize: 18,
  },
});
