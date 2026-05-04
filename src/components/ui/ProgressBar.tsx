import { getTheme, radii } from "@/styles/theme";
import { Text, View, useColorScheme } from "react-native";

type Props = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: Props) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const pct = Math.min(100, Math.max(0, value));

  return (
    <View style={{ gap: 8 }}>
      {label ? (
        <Text style={{ color: t.textSecondary, fontSize: 13 }}>{label}</Text>
      ) : null}
      <View
        style={{
          height: 8,
          backgroundColor: t.textSecondary + "33",
          borderRadius: radii.pill,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${pct}%`,
            height: "100%",
            backgroundColor: t.primary,
            borderRadius: radii.pill,
          }}
        />
      </View>
    </View>
  );
}
