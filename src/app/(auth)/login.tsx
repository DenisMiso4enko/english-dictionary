import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { TextField } from "@/components/ui/TextField";
import { getTheme, typography } from "@/styles/theme";
import { supabase } from "@/utils/supabase";
import { hx } from "@/utils/navigation";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const t = getTheme(scheme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit() {
    setMessage(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    router.replace(hx("/(tabs)"));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.bg }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 24,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[typography.title, { color: t.text, marginBottom: 8 }]}>
          Лингво
        </Text>

        <View style={{ gap: 16 }}>
          <TextField
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
          />
          <TextField
            label="Пароль"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {message ? (
          <Text style={{ color: t.danger, marginTop: 12 }}>{message}</Text>
        ) : null}

        <PrimaryButton
          title="Войти"
          onPress={onSubmit}
          loading={loading}
          style={{ marginTop: 24 }}
        />

        <Link href={hx("/(auth)/register")} asChild>
          <Pressable style={{ marginTop: 20 }}>
            <Text style={{ color: t.primary, textAlign: "center" }}>
              Создать аккаунт
            </Text>
          </Pressable>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
