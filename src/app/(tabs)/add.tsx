import { AppScreen } from "@/components/ui/AppScreen";
import { CategoryPicker } from "@/components/ui/CategoryPicker";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import type { WordDifficulty } from "@/types/word";
import { useWords } from "@/hooks/useWords";
import { getTheme, radii, typography } from "@/styles/theme";
import { hx } from "@/utils/navigation";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, View, useColorScheme } from "react-native";

const difficulties: WordDifficulty[] = ["easy", "medium", "hard"];
const labels: Record<WordDifficulty, string> = {
  easy: "Лёгкое",
  medium: "Среднее",
  hard: "Сложное",
};

export default function AddWordScreen() {
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const { words, insertWord } = useWords();
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [example, setExample] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState<WordDifficulty>("medium");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const existingCategories = useMemo(
    () =>
      [
        ...new Set(words.map((w) => (w.category ?? "").trim()).filter(Boolean)),
      ].sort((a, b) => a.localeCompare(b, "ru")),
    [words],
  );

  /** Однократная подстановка первой категории при загрузке списка; не затирать ввод и не реагировать на очистку поля */
  const didApplyDefaultCategory = useRef(false);

  useEffect(() => {
    if (didApplyDefaultCategory.current) return;
    if (existingCategories.length === 0) return;
    setCategory((prev) => {
      if (prev.trim() !== "") {
        didApplyDefaultCategory.current = true;
        return prev;
      }
      didApplyDefaultCategory.current = true;
      return existingCategories[0]!;
    });
  }, [existingCategories]);

  async function save() {
    setMsg(null);
    if (!word.trim() || !translation.trim()) {
      setMsg("Заполните слово и перевод");
      return;
    }
    const cat = category.trim();
    if (!cat) {
      setMsg("Выберите категорию из списка или введите свою");
      return;
    }
    setLoading(true);
    const { error } = await insertWord({
      word,
      translation,
      example: example || undefined,
      category: cat,
      difficulty,
    });
    setLoading(false);
    if (error) {
      setMsg(error);
      return;
    }
    setWord("");
    setTranslation("");
    setExample("");
    setDifficulty("medium");
    setCategory("");
    didApplyDefaultCategory.current = false;
    router.push(hx("/(tabs)"));
  }

  return (
    <AppScreen>
      <Text style={[typography.title, { color: t.text, marginBottom: 8 }]}>
        Новое слово
      </Text>

      <View style={{ gap: 16 }}>
        <TextField
          label="Слово или фраза"
          value={word}
          onChangeText={setWord}
        />
        <TextField
          label="Перевод"
          value={translation}
          onChangeText={setTranslation}
        />
        <TextField
          label="Пример использования"
          value={example}
          onChangeText={setExample}
          multiline
          style={{ minHeight: 100, textAlignVertical: "top" }}
        />
        <CategoryPicker
          existingCategories={existingCategories}
          value={category}
          onChange={setCategory}
        />
      </View>

      <Text style={{ color: t.textSecondary, marginTop: 16, marginBottom: 8 }}>
        Сложность
      </Text>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        {difficulties.map((d) => {
          const selected = difficulty === d;
          return (
            <Pressable
              key={d}
              onPress={() => setDifficulty(d)}
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
                {labels[d]}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {msg ? (
        <Text style={{ color: t.danger, marginTop: 16 }}>{msg}</Text>
      ) : null}

      <PrimaryButton
        title="Сохранить"
        onPress={save}
        loading={loading}
        style={{ marginTop: 28 }}
      />
    </AppScreen>
  );
}
