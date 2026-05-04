import { globalStyles } from "@/styles/globals";
import { getTheme } from "@/styles/theme";
import type { ReactNode } from "react";
import { ScrollView, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppScreenProps = {
  children: ReactNode;
  /** Дополнительный отступ снизу под нативный таб-бар */
  bottomExtra?: number;
};

export function AppScreen({ children, bottomExtra = 88 }: AppScreenProps) {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const padBottom = insets.bottom + bottomExtra;

  return (
    <View
      style={[
        globalStyles.fill,
        { backgroundColor: t.bg, paddingTop: insets.top },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: padBottom,
          paddingHorizontal: 16,
        }}
      >
        {children}
      </ScrollView>
    </View>
  );
}
