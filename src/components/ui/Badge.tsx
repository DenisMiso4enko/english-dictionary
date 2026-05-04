import { getTheme, radii } from "@/styles/theme";
import type { WordStatus } from "@/types/word";
import { Text, View, useColorScheme } from "react-native";

const labels: Record<WordStatus, string> = {
  new: "Новое",
  learning: "В процессе",
  learned: "Выучено",
};

export function Badge({ status }: { status: WordStatus }) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  const bg =
    status === "learned"
      ? t.secondary + "33"
      : status === "learning"
        ? t.tertiary + "33"
        : t.textSecondary + "22";
  const color =
    status === "learned" ? t.secondary : status === "learning" ? t.tertiary : t.textSecondary;

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: bg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: radii.pill,
      }}
    >
      <Text style={{ color, fontSize: 12, fontWeight: "600" }}>{labels[status]}</Text>
    </View>
  );
}
