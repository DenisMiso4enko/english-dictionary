import { useAuth } from "@/hooks/useAuth";
import type { WordDifficulty, WordRow, WordStatus } from "@/types/word";
import { formatSupabaseWordsError } from "@/utils/supabaseErrors";
import { supabase } from "@/utils/supabase";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useWords() {
  const { user } = useAuth();
  const [words, setWords] = useState<WordRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setWords([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: e } = await supabase
      .from("words")
      .select("*")
      .order("created_at", { ascending: false });
    if (e) {
      setError(formatSupabaseWordsError(e.message));
      setWords([]);
    } else {
      setWords((data as WordRow[]) ?? []);
    }
    setLoading(false);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const insertWord = useCallback(
    async (row: {
      word: string;
      translation: string;
      example?: string;
      category?: string;
      difficulty?: WordDifficulty;
    }) => {
      if (!user) return { error: "Нет пользователя" };
      const { error: e } = await supabase.from("words").insert({
        user_id: user.id,
        word: row.word.trim(),
        translation: row.translation.trim(),
        example: row.example?.trim() || null,
        category: row.category?.trim() || "Общее",
        difficulty: row.difficulty ?? "medium",
        status: "new",
      });
      if (!e) await refresh();
      return {
        error: e?.message ? formatSupabaseWordsError(e.message) : undefined,
      };
    },
    [user, refresh],
  );

  const updateWord = useCallback(
    async (
      id: string,
      patch: Partial<{ status: WordStatus; difficulty: WordDifficulty }>,
    ) => {
      const { error: e } = await supabase
        .from("words")
        .update(patch)
        .eq("id", id);
      if (!e) await refresh();
      return {
        error: e?.message ? formatSupabaseWordsError(e.message) : undefined,
      };
    },
    [refresh],
  );

  const deleteWord = useCallback(
    async (id: string) => {
      const { error: e } = await supabase.from("words").delete().eq("id", id);
      if (!e) await refresh();
      return {
        error: e?.message ? formatSupabaseWordsError(e.message) : undefined,
      };
    },
    [refresh],
  );

  return {
    words,
    loading,
    error,
    refresh,
    insertWord,
    updateWord,
    deleteWord,
  };
}
