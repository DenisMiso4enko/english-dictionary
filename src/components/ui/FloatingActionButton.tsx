import { getTheme } from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import type { PressableProps } from "react-native";
import { Pressable, useColorScheme } from "react-native";

export function FloatingActionButton(props: Omit<PressableProps, "children">) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => ({
        position: "absolute",
        right: 20,
        bottom: 110,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: t.primary,
        alignItems: "center",
        justifyContent: "center",
        opacity: pressed ? 0.9 : 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
      })}
      {...props}
    >
      <Ionicons name="add" size={28} color="#fff" />
    </Pressable>
  );
}
