import { getTheme, radii, typography } from "@/styles/theme";
import { useMemo } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

type Props = {
  existingCategories: string[];
  value: string;
  onChange: (value: string) => void;
};

export function CategoryPicker({ existingCategories, value, onChange }: Props) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  const chips = useMemo(
    () => [...existingCategories].sort((a, b) => a.localeCompare(b, "ru")),
    [existingCategories],
  );

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: t.textSecondary, fontSize: 14, fontWeight: "500" }}>
        Категория
      </Text>

      {chips.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {chips.map((c) => {
            const selected = value.trim().toLowerCase() === c.toLowerCase();
            return (
              <Pressable
                key={c}
                onPress={() => onChange(c)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: radii.pill,
                  backgroundColor: selected ? t.primary + "22" : t.bgElevated,
                  borderWidth: selected ? 2 : 1,
                  borderColor: selected ? t.primary : t.border,
                }}
              >
                <Text
                  style={{
                    color: selected ? t.primary : t.text,
                    fontWeight: "600",
                  }}
                >
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : null}

      <Text style={[typography.subhead, { color: t.textSecondary }]}>
        {chips.length > 0
          ? "Или введите новую категорию:"
          : "Введите категорию (после сохранения она появится в быстром выборе)."}
      </Text>
      <TextInput
        placeholder="Например: Еда, Работа…"
        placeholderTextColor={t.textSecondary}
        value={value}
        onChangeText={onChange}
        style={{
          borderWidth: 1,
          borderColor: t.border,
          borderRadius: radii.md,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 17,
          color: t.text,
          backgroundColor: t.bgElevated,
        }}
      />
    </View>
  );
}
