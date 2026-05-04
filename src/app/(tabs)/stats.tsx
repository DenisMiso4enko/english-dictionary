import { AppScreen } from "@/components/ui/AppScreen";
import { Card } from "@/components/ui/Card";
import { ScrollContentCenter } from "@/components/ui/ScrollContentCenter";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { StatDetailRow } from "@/components/ui/StatDetailRow";
import { StatPill } from "@/components/ui/StatPill";
import { WeeklyBarChart } from "@/components/ui/WeeklyBarChart";
import { STATS_DETAIL_ROWS } from "@/config/statsScreen";
import { useWords } from "@/hooks/useWords";
import { getTheme, typography } from "@/styles/theme";
import { countByStatus, wordsPerDayLastWeek } from "@/utils/stats";
import { useMemo } from "react";
import { ActivityIndicator, Text, View, useColorScheme } from "react-native";

export default function StatsScreen() {
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const { words, loading } = useWords();
  const stats = countByStatus(words);
  const learned = stats.learned;
  const practicedDen = learned + stats.learning + stats.new;
  const accuracy =
    practicedDen === 0 ? 0 : Math.round((learned / Math.max(practicedDen, 1)) * 100);
  const week = wordsPerDayLastWeek(words);
  const weekTotal = week.reduce((s, d) => s + d.count, 0);
  const streakDays = 14;

  const statsDetailContext = useMemo(
    () => ({
      learned,
      streakDays,
      stats,
    }),
    [learned, streakDays, stats],
  );

  return (
    <AppScreen>
      <ScreenHeader title="Статистика" />

      {loading ? (
        <ScrollContentCenter topReserve={56}>
          <ActivityIndicator size="large" color={t.primary} />
        </ScrollContentCenter>
      ) : (
        <>
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 8 }}>
            <StatPill label="Точность" value={`${accuracy}%`} />
            <StatPill label="Словарь" value={`${words.length}`} />
          </View>

          <Card style={{ marginTop: 16 }}>
            <WeeklyBarChart data={week} />
            <Text style={{ color: t.textSecondary, marginTop: 16, fontSize: 13 }}>
              Всего за неделю: {weekTotal} новых записей
            </Text>
          </Card>

          <Text style={[typography.headline, { color: t.text, marginTop: 24, marginBottom: 12 }]}>
            Подробнее
          </Text>
          <Card>
            {STATS_DETAIL_ROWS.map((row) => (
              <StatDetailRow
                key={row.id}
                label={row.label}
                value={row.getValue(statsDetailContext)}
              />
            ))}
          </Card>

          <Card style={{ marginTop: 16, backgroundColor: t.primary + "18" }}>
            <Text style={{ color: t.primary, fontWeight: "600", fontSize: 15 }}>
              «Язык — это чемодан, в который нельзя положить ничего нового, пока не вынешь что-то
              старое». — для учебного проекта :)
            </Text>
          </Card>
        </>
      )}
    </AppScreen>
  );
}
