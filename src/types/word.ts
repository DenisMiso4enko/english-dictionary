export type WordDifficulty = "easy" | "medium" | "hard";
export type WordStatus = "new" | "learning" | "learned";

export type WordRow = {
  id: string;
  user_id: string;
  word: string;
  translation: string;
  example: string | null;
  category: string | null;
  difficulty: WordDifficulty;
  status: WordStatus;
  created_at: string;
  updated_at: string;
};
