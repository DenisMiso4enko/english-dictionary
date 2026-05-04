import { getTheme, radii } from "@/styles/theme";
import type { PressableProps, PressableStateCallbackType } from "react-native";
import { ActivityIndicator, Pressable, Text, useColorScheme } from "react-native";

type Variant = "primary" | "inverted" | "outline";

type Props = PressableProps & {
  title: string;
  variant?: Variant;
  loading?: boolean;
};

export function PrimaryButton({
  title,
  variant = "primary",
  loading,
  disabled,
  style,
  ...rest
}: Props) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  const bg =
    variant === "primary"
      ? t.primary
      : variant === "inverted"
        ? t.text
        : "transparent";
  const fg =
    variant === "outline"
      ? t.primary
      : variant === "inverted"
        ? t.bg
        : "#FFFFFF";
  const borderWidth = variant === "outline" ? 2 : 0;
  const borderColor = variant === "outline" ? t.primary : "transparent";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={(state: PressableStateCallbackType) => {
        const extra = typeof style === "function" ? style(state) : style;
        return [
          {
            backgroundColor: bg,
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: radii.md,
            alignItems: "center",
            justifyContent: "center",
            opacity: state.pressed ? 0.88 : disabled ? 0.5 : 1,
            borderWidth,
            borderColor,
          },
          extra,
        ];
      }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <Text style={{ color: fg, fontSize: 17, fontWeight: "600" }}>{title}</Text>
      )}
    </Pressable>
  );
}
