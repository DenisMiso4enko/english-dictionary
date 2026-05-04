import { AppScreen } from "@/components/ui/AppScreen";
import { Card } from "@/components/ui/Card";
import { ScrollContentCenter } from "@/components/ui/ScrollContentCenter";
import { useWords } from "@/hooks/useWords";
import { getTheme, radii, typography } from "@/styles/theme";
import type { WordRow } from "@/types/word";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import * as Speech from "expo-speech";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, useColorScheme } from "react-native";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticeScreen() {
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const { words, loading, updateWord } = useWords();

  const wordsRef = useRef(words);
  wordsRef.current = words;

  /** Очередь карточек текущей сессии: текущая — всегда queue[0] */
  const [queue, setQueue] = useState<WordRow[]>([]);
  const sessionTotal = useRef(0);
  const [showBack, setShowBack] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const pool = wordsRef.current.filter((w) => w.status !== "learned");
      const next = shuffle(pool);
      sessionTotal.current = next.length;
      setQueue(next);
      setShowBack(false);
    }, []),
  );

  const total = sessionTotal.current;
  const remaining = queue.length;
  const current = queue[0];
  const answered = total - remaining;
  const pos = remaining === 0 && total > 0 ? total : answered + 1;
  const progressPct = total === 0 ? 0 : (answered / total) * 100;

  const finishCard = useCallback(() => {
    setQueue((q) => q.slice(1));
    setShowBack(false);
  }, []);

  const onForgot = async () => {
    if (!current) return;
    await updateWord(current.id, { status: "learning" });
    finishCard();
  };

  const onKnow = async () => {
    if (!current) return;
    await updateWord(current.id, { status: "learned" });
    finishCard();
  };

  if (loading) {
    return (
      <AppScreen>
        <ScrollContentCenter>
          <ActivityIndicator size="large" color={t.primary} />
        </ScrollContentCenter>
      </AppScreen>
    );
  }

  const poolEmpty = words.filter((w) => w.status !== "learned").length === 0;

  if (!loading && poolEmpty && total === 0) {
    return (
      <AppScreen>
        <ScrollContentCenter>
          <Text style={[typography.headline, { color: t.text, textAlign: "center" }]}>
            Нет слов для практики
          </Text>
          <Text style={{ color: t.textSecondary, marginTop: 8, textAlign: "center", paddingHorizontal: 16 }}>
            Добавьте слова или все уже отмечены как выученные.
          </Text>
        </ScrollContentCenter>
      </AppScreen>
    );
  }

  if (remaining === 0 && total > 0) {
    return (
      <AppScreen>
        <ScrollContentCenter>
          <Text style={[typography.title, { color: t.text, textAlign: "center" }]}>
            Отличная работа!
          </Text>
          <Text style={{ color: t.textSecondary, textAlign: "center", marginTop: 12, paddingHorizontal: 12 }}>
            Вы прошли все {total} карточек в этой сессии.
          </Text>
          <Text style={{ color: t.textSecondary, textAlign: "center", marginTop: 8, paddingHorizontal: 12 }}>
            Зайдите на другую вкладку и снова на «Практика», чтобы начать новый раунд.
          </Text>
        </ScrollContentCenter>
      </AppScreen>
    );
  }

  if (!current) {
    return (
      <AppScreen>
        <ScrollContentCenter>
          <ActivityIndicator size="large" color={t.primary} />
        </ScrollContentCenter>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <Text style={{ color: t.textSecondary, fontSize: 13, textAlign: "center", marginBottom: 8 }}>
        {pos} / {total}
      </Text>
      <View
        style={{
          height: 6,
          backgroundColor: t.textSecondary + "33",
          borderRadius: radii.pill,
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <View
          style={{
            width: `${progressPct}%`,
            height: "100%",
            backgroundColor: t.primary,
            borderRadius: radii.pill,
          }}
        />
      </View>

      <Card
        style={{
          minHeight: 280,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 32,
        }}
      >
        <Pressable onPress={() => setShowBack((s) => !s)} style={{ alignItems: "center" }}>
          <Text
            style={[
              typography.title,
              { color: t.text, textAlign: "center", paddingHorizontal: 8 },
            ]}
          >
            {showBack ? current.translation : current.word}
          </Text>
          <Text
            style={{
              color: t.textSecondary,
              textAlign: "center",
              marginTop: 20,
              fontSize: 15,
            }}
          >
            {showBack ? "Нажмите, чтобы вернуться к слову" : "Нажмите, чтобы увидеть перевод"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => Speech.speak(current.word, { language: "en-US" })}
          style={{ marginTop: 28 }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: t.primary + "18",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="volume-medium" size={26} color={t.primary} />
          </View>
        </Pressable>
      </Card>

      <Text
        style={{
          color: t.textSecondary,
          fontSize: 13,
          textAlign: "center",
          marginTop: 16,
          marginBottom: 8,
        }}
      >
        Помните это слово?
      </Text>

      <View style={{ flexDirection: "row", gap: 20, marginTop: 8, justifyContent: "center" }}>
        <Pressable
          onPress={onForgot}
          style={({ pressed }) => ({
            width: 88,
            height: 88,
            borderRadius: radii.lg,
            borderWidth: 2.5,
            borderColor: t.danger,
            backgroundColor: t.card,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.88 : 1,
          })}
        >
          <Ionicons name="close" size={40} color={t.danger} />
        </Pressable>
        <Pressable
          onPress={onKnow}
          style={({ pressed }) => ({
            width: 88,
            height: 88,
            borderRadius: radii.lg,
            backgroundColor: t.primary,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.88 : 1,
            shadowColor: t.primary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 10,
            elevation: 6,
          })}
        >
          <Ionicons name="checkmark" size={40} color="#fff" />
        </Pressable>
      </View>
    </AppScreen>
  );
}
