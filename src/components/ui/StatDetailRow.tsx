import { getTheme } from "@/styles/theme";
import { Text, View, useColorScheme } from "react-native";

type Props = { label: string; value: string };

export function StatDetailRow({ label, value }: Props) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
      <Text style={{ color: t.textSecondary }}>{label}</Text>
      <Text style={{ color: t.text, fontWeight: "600" }}>{value}</Text>
    </View>
  );
}
