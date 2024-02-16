import { StyleSheet } from "react-native";

import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
  mainView: { flex: 1, padding: 10 },
  welcomeText: {
    fontSize: 20,
    // fontWeight: "bold",
  },
  sectionHeader: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  sectionName: {
    fontSize: 28,
  },
  logoutText: {
    color: "#fff",
  },
  listItemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  sheetContainer: {
    flex: 1,
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sheetHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  sheetHeaderTitle: {
    fontSize: 20,
    color: Colors.primary,
  },
  sheetContent: {
    flex: 1,
    padding: 10,
  },
  sheetText: {
    color: Colors.primary,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  //AVATAR
  userAvatar: {
    // width: 30,
    // height: 30,
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#fff",
  },
  userAvatarInitials: {
    color: Colors.primary,
    fontFamily: "ComfortaaBold",
  },

  colorsSection: {
    marginTop: 15,
  },
  colorsText: {
    color: Colors.primary,
    marginBottom: 5,
  },
  colorsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default styles;
