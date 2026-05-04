import { getTheme, radii } from "@/styles/theme";
import type { TextInputProps } from "react-native";
import { Text, TextInput, View, useColorScheme } from "react-native";

type Props = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...rest }: Props) {
  const scheme = useColorScheme();
  const t = getTheme(scheme);

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: t.textSecondary, fontSize: 14, fontWeight: "500" }}>{label}</Text>
      <TextInput
        placeholderTextColor={t.textSecondary}
        style={[
          {
            borderWidth: 1,
            borderColor: t.border,
            borderRadius: radii.md,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 17,
            color: t.text,
            backgroundColor: t.bgElevated,
          },
          style,
        ]}
        {...rest}
      />
    </View>
  );
}
