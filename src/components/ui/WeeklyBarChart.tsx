import { getTheme, typography } from "@/styles/theme";
import { Text, View, useColorScheme } from "react-native";

type Point = { label: string; count: number };

export function WeeklyBarChart({ data }: { data: Point[] }) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const max = Math.max(1, ...data.map((d) => d.count));
  const barMaxPx = 96;

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={[typography.headline, { color: t.text, marginBottom: 12 }]}>Новые слова</Text>
      <View style={{ flexDirection: "row", alignItems: "flex-end", height: 120, gap: 6 }}>
        {data.map((d) => (
          <View key={d.label} style={{ flex: 1, alignItems: "center" }}>
            <View
              style={{
                width: "100%",
                height: Math.max(6, (d.count / max) * barMaxPx),
                backgroundColor: t.primary,
                borderRadius: 6,
                opacity: d.count === 0 ? 0.25 : 1,
              }}
            />
            <Text style={{ color: t.textSecondary, fontSize: 11, marginTop: 6 }}>{d.label}</Text>
            <Text style={{ color: t.text, fontSize: 12, fontWeight: "600" }}>{d.count}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
