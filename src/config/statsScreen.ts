import { countByStatus } from "@/utils/stats";

export type StatsDetailContext = {
  learned: number;
  streakDays: number;
  stats: ReturnType<typeof countByStatus>;
};

type StatsDetailRowConfig = {
  id: string;
  label: string;
  getValue: (ctx: StatsDetailContext) => string;
};

/** Строки блока «Подробнее» на экране статистики */
export const STATS_DETAIL_ROWS: StatsDetailRowConfig[] = [
  {
    id: "learned",
    label: "Выучено",
    getValue: (ctx) => String(ctx.learned),
  },
  {
    id: "streak",
    label: "Серия (демо)",
    getValue: (ctx) => `${ctx.streakDays} дн.`,
  },
  {
    id: "learning",
    label: "В процессе",
    getValue: (ctx) => String(ctx.stats.learning),
  },
];
