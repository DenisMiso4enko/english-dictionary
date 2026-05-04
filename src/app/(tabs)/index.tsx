import { AppScreen } from "@/components/ui/AppScreen";
import { Card } from "@/components/ui/Card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { WordListItem } from "@/components/ui/WordListItem";
import { useWords } from "@/hooks/useWords";
import { getTheme, typography } from "@/styles/theme";
import { countByStatus, groupWordsByCategory } from "@/utils/stats";
import { hx } from "@/utils/navigation";
import { router } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  useColorScheme,
} from "react-native";

export default function WordsScreen() {
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const { words, loading, error, refresh } = useWords();
  const stats = countByStatus(words);
  const total = words.length;
  const learned = stats.learned;
  const goalPct = total === 0 ? 0 : Math.round((learned / total) * 100);
  const newForPractice = stats.new + stats.learning;

  const wordsByCategory = useMemo(() => groupWordsByCategory(words), [words]);

  return (
    <View style={{ flex: 1 }}>
      <AppScreen>
        <ScreenHeader
          title="Лингво"
          subtitle={`${total.toLocaleString()} слов`}
        />

        <Card style={{ marginBottom: 20 }}>
          <Text style={{ color: t.textSecondary, fontSize: 14 }}>
            Сегодня · практика
          </Text>
          <Text style={[typography.headline, { color: t.text, marginTop: 8 }]}>
            Готовы к практике?
          </Text>
          <Text style={{ color: t.textSecondary, marginTop: 4 }}>
            {newForPractice > 0
              ? `Повторите ${newForPractice} слов`
              : "Все карточки на сегодня пройдены"}
          </Text>
          <PrimaryButton
            title="Начать"
            style={{ marginTop: 16 }}
            onPress={() => router.push(hx("/(tabs)/practice"))}
          />
        </Card>

        <ProgressBar value={goalPct} label={`Цель: словарь · ${goalPct}%`} />

        {loading ? (
          <ActivityIndicator style={{ marginTop: 24 }} color={t.primary} />
        ) : error ? (
          <Text style={{ color: t.danger, marginTop: 16 }}>
            {error}{" "}
            <Text onPress={refresh} style={{ color: t.primary }}>
              Повторить
            </Text>
          </Text>
        ) : null}

        <Text
          style={[
            typography.headline,
            { color: t.text, marginTop: 24, marginBottom: 12 },
          ]}
        >
          Мои слова
        </Text>

        {wordsByCategory.map(({ category, words: section }) => (
          <View key={category} style={{ marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: t.textSecondary,
                marginBottom: 10,
                letterSpacing: 0.2,
              }}
            >
              {category} · {section.length}
            </Text>
            {section.map((item) => (
              <WordListItem key={item.id} item={item} />
            ))}
          </View>
        ))}

        {!loading && words.length === 0 && !error ? (
          <Text
            style={{
              color: t.textSecondary,
              textAlign: "center",
              marginTop: 24,
            }}
          >
            Добавьте первое слово через вкладку «Добавить» или кнопку +.
          </Text>
        ) : null}

        <Pressable onPress={refresh} style={{ padding: 16 }}>
          <Text style={{ color: t.primary, textAlign: "center" }}>
            Обновить список
          </Text>
        </Pressable>
      </AppScreen>

      <FloatingActionButton onPress={() => router.push(hx("/(tabs)/add"))} />
    </View>
  );
}
