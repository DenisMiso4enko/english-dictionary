import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useColorScheme } from "react-native";

function isIos26OrNewer() {
  if (Platform.OS !== "ios") return false;
  const v = Platform.Version;
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) && n >= 26;
}

export default function TabLayout() {
  const scheme = useColorScheme();
  const activeTint = scheme === "dark" ? "#0A84FF" : "#007AFF";
  const inactiveTint =
    scheme === "dark" ? "rgba(235, 235, 245, 0.55)" : "rgba(60, 60, 67, 0.6)";

  return (
    <NativeTabs
      tintColor={activeTint}
      iconColor={{ default: inactiveTint, selected: activeTint }}
      labelStyle={{
        default: { fontSize: 10, fontWeight: "500" },
        selected: { fontSize: 10, fontWeight: "600" },
      }}
      blurEffect={
        scheme === "dark" ? "systemChromeMaterialDark" : "systemChromeMaterialLight"
      }
      {...(isIos26OrNewer() ? { minimizeBehavior: "automatic" as const } : {})}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: "book", selected: "book.fill" }}
          md="menu_book"
        />
        <NativeTabs.Trigger.Label>Слова</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="add">
        <NativeTabs.Trigger.Icon
          sf={{ default: "plus.circle", selected: "plus.circle.fill" }}
          md="add_circle"
        />
        <NativeTabs.Trigger.Label>Добавить</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="practice">
        <NativeTabs.Trigger.Icon
          sf={{ default: "square.stack", selected: "square.stack.fill" }}
          md="layers"
        />
        <NativeTabs.Trigger.Label>Практика</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="stats">
        <NativeTabs.Trigger.Icon
          sf={{ default: "chart.bar", selected: "chart.bar.fill" }}
          md="bar_chart"
        />
        <NativeTabs.Trigger.Label>Статистика</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
