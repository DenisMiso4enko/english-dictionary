import { StyleSheet } from "react-native";

import { radii, spacing } from "@/styles/theme";

export const globalStyles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  screenPad: {
    paddingHorizontal: spacing.md,
  },
  cardRadius: {
    borderRadius: radii.lg,
  },
});
