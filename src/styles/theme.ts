/**
 * Дизайн-система «Лингво» (палитра из макета).
 * Используйте getTheme() с текущей цветовой схемой устройства.
 */
import type { ColorSchemeName } from "react-native";

export const palette = {
  primary: "#007AFF",
  secondary: "#34C759",
  tertiary: "#AF52DE",
  danger: "#FF3B30",
  textPrimary: "#1C1C1E",
  textSecondary: "#8E8E93",
  separator: "rgba(60, 60, 67, 0.29)",
} as const;

export type Theme = {
  bg: string;
  bgElevated: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  secondary: string;
  tertiary: string;
  danger: string;
  tabBarOverlay: string;
};

const light: Theme = {
  bg: "#F2F2F7",
  bgElevated: "#FFFFFF",
  card: "#FFFFFF",
  text: palette.textPrimary,
  textSecondary: palette.textSecondary,
  border: palette.separator,
  primary: palette.primary,
  secondary: palette.secondary,
  tertiary: palette.tertiary,
  danger: palette.danger,
  tabBarOverlay: "rgba(255,255,255,0.9)",
};

const dark: Theme = {
  bg: "#000000",
  bgElevated: "#1C1C1E",
  card: "#1C1C1E",
  text: "#F2F2F7",
  textSecondary: "#8E8E93",
  border: "rgba(84, 84, 88, 0.65)",
  primary: "#0A84FF",
  secondary: "#30D158",
  tertiary: "#BF5AF2",
  danger: "#FF453A",
  tabBarOverlay: "rgba(28,28,30,0.94)",
};

export function getTheme(scheme: ColorSchemeName | null): Theme {
  return scheme === "dark" ? dark : light;
}

export const radii = {
  sm: 10,
  md: 16,
  lg: 20,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const shadow = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
};

export const typography = {
  title: { fontSize: 28, fontWeight: "700" as const },
  headline: { fontSize: 20, fontWeight: "600" as const },
  body: { fontSize: 17, fontWeight: "400" as const },
  subhead: { fontSize: 15, fontWeight: "400" as const },
  caption: { fontSize: 13, fontWeight: "400" as const },
  tab: { fontSize: 10, fontWeight: "500" as const },
};
