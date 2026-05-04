import { Alert } from "react-native";
import { useAuth } from "./useAuth";
import { router } from "expo-router";
import { hx } from "@/utils/navigation";

export const useUser = () => {
  const { user, signOut } = useAuth();
  const avatarUri =
    (user?.user_metadata?.avatar_url as string | undefined) ??
    (user?.user_metadata?.picture as string | undefined) ??
    null;
  const avatarLetter =
    user?.user_metadata?.full_name &&
    typeof user.user_metadata.full_name === "string" &&
    user.user_metadata.full_name.trim().length > 0
      ? user.user_metadata.full_name.trim().charAt(0)
      : (user?.email?.charAt(0) ?? "?");
  const showPhoto = Boolean(avatarUri);

  function onLogout() {
    Alert.alert("Выход", "Выйти из аккаунта?", [
      { text: "Отмена", style: "cancel" },
      {
        text: "Выйти",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace(hx("/(auth)/login"));
        },
      },
    ]);
  }
  return { showPhoto, avatarUri, avatarLetter, onLogout };
};
