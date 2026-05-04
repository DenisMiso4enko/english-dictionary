import { Card } from "@/components/ui/Card";
import { getTheme, typography } from "@/styles/theme";
import { Text, useColorScheme } from "react-native";

type Props = { label: string; value: string };

export function StatPill({ label, value }: Props) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  return (
    <Card style={{ flex: 1, minWidth: "45%" }}>
      <Text style={{ color: t.textSecondary, fontSize: 13 }}>{label}</Text>
      <Text style={[typography.headline, { color: t.text, marginTop: 8 }]}>{value}</Text>
    </Card>
  );
}
