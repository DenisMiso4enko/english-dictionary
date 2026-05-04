export function formatSupabaseWordsError(message: string | undefined): string {
  if (!message) return "Неизвестная ошибка";
  const m = message.toLowerCase();
  if (
    m.includes("schema cache") ||
    m.includes("could not find the table") ||
    (m.includes("relation") && m.includes("does not exist"))
  ) {
    return "В проекте Supabase нет таблицы «words». Откройте Dashboard → SQL Editor, вставьте скрипт из my-app/docs/supabase-setup.sql и нажмите Run. URL в .env должен совпадать с этим проектом.";
  }
  if (m.includes("jwt") || m.includes("invalid api key")) {
    return "Проверьте EXPO_PUBLIC_SUPABASE_KEY в .env (ключ anon / publishable из Settings → API).";
  }
  if (
    m.includes("row-level security") ||
    m.includes("violates row-level security")
  ) {
    return "Доступ запрещён политиками RLS. Войдите в аккаунт и проверьте политики для таблицы words.";
  }
  return message;
}
