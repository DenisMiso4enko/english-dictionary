import type { WordRow } from "@/types/word";

export function wordsPerDayLastWeek(
  words: WordRow[],
): { label: string; count: number }[] {
  const days: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  const counts = days.map(() => 0);
  for (const w of words) {
    const t = new Date(w.created_at).getTime();
    days.forEach((start, idx) => {
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      if (t >= start.getTime() && t < end.getTime()) counts[idx] += 1;
    });
  }
  return days.map((d, i) => ({
    label: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][d.getDay()],
    count: counts[i] ?? 0,
  }));
}

export function countByStatus(words: WordRow[]) {
  return words.reduce(
    (acc, w) => {
      acc[w.status] += 1;
      return acc;
    },
    { new: 0, learning: 0, learned: 0 } as Record<WordRow["status"], number>,
  );
}

/** Группировка для главного экрана: алфавит категорий, внутри — новее сверху */
export function groupWordsByCategory(words: WordRow[]): {
  category: string;
  words: WordRow[];
}[] {
  const map = new Map<string, WordRow[]>();
  for (const w of words) {
    const cat = (w.category ?? "").trim() || "Без категории";
    const list = map.get(cat);
    if (list) list.push(w);
    else map.set(cat, [w]);
  }
  return [...map.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], "ru"))
    .map(([category, group]) => ({
      category,
      words: [...group].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    }));
}
