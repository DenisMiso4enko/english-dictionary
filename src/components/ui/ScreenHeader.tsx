import { useUser } from "@/hooks/useUser";
import { globalStyles } from "@/styles/globals";
import { getTheme, typography } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View, useColorScheme } from "react-native";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const scheme = useColorScheme();
  const { showPhoto, avatarUri, avatarLetter, onLogout } = useUser();
  const t = getTheme(scheme);

  return (
    <View style={[globalStyles.rowBetween, { marginBottom: 16 }]}>
      <View style={[globalStyles.row, { gap: 12 }]}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: t.primary + "22",
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showPhoto ? (
            <Image
              source={{ uri: avatarUri! }}
              style={{ width: 40, height: 40 }}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <Text style={{ fontSize: 17, fontWeight: "700", color: t.primary }}>
              {avatarLetter}
            </Text>
          )}
        </View>
        <View>
          <Text style={[typography.headline, { color: t.text }]}>{title}</Text>
          {subtitle ? (
            <Text
              style={{ color: t.textSecondary, fontSize: 13, marginTop: 2 }}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      <Pressable
        accessibilityLabel="Выйти"
        onPress={onLogout}
        hitSlop={12}
        style={({ pressed }) => ({ opacity: pressed ? 0.65 : 1 })}
      >
        <Ionicons name="log-out-outline" size={26} color={t.textSecondary} />
      </Pressable>
    </View>
  );
}
