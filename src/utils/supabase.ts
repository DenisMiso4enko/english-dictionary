import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import type { WordRow } from "@/types/word";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_KEY!,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);

export type Database = {
  public: {
    Tables: {
      words: {
        Row: WordRow;
        Insert: Omit<WordRow, "id" | "created_at" | "updated_at"> & {
          id?: string;
        };
        Update: Partial<Omit<WordRow, "id" | "user_id">>;
      };
    };
  };
};
