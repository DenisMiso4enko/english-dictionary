import { getTheme, radii, shadow } from "@/styles/theme";
import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";
import { View, useColorScheme } from "react-native";

type CardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: CardProps) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  return (
    <View
      style={[
        {
          backgroundColor: t.card,
          borderRadius: radii.lg,
          padding: 16,
        },
        shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}
