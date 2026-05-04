import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getTheme, typography } from "@/styles/theme";
import type { WordRow } from "@/types/word";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Pressable, Text, View, useColorScheme } from "react-native";

type Props = {
  item: WordRow;
  onSpeak?: (lang: "en-US" | "ru-RU") => void;
};

export function WordListItem({ item, onSpeak }: Props) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  const speak = (lang: "en-US" | "ru-RU") => {
    if (onSpeak) onSpeak(lang);
    else
      Speech.speak(lang === "en-US" ? item.word : item.translation, {
        language: lang,
      });
  };

  return (
    <Card style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Badge status={item.status} />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable onPress={() => speak("en-US")} hitSlop={8}>
            <Ionicons
              name="volume-medium-outline"
              size={22}
              color={t.primary}
            />
          </Pressable>
          <Pressable onPress={() => speak("ru-RU")} hitSlop={8}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={t.textSecondary}
            />
          </Pressable>
        </View>
      </View>
      <Text style={[typography.headline, { color: t.text, marginTop: 12 }]}>
        {item.word}
      </Text>
      <Text
        style={[typography.subhead, { color: t.textSecondary, marginTop: 4 }]}
      >
        {item.translation}
      </Text>
    </Card>
  );
}
