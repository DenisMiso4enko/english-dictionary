import type { ReactNode } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/** Совпадает с отступом под таб-бар в `AppScreen` */
const DEFAULT_BOTTOM_EXTRA = 88;

type Props = {
  children: ReactNode;
  bottomExtra?: number;
  /** Уже занятая высота над этим блоком (заголовок экрана и т.п.) */
  topReserve?: number;
};

/**
 * Внутри `AppScreen` / `ScrollView` растягивает область по высоте экрана,
 * чтобы лоадер и пустые состояния были по центру видимой зоны.
 */
export function ScrollContentCenter({
  children,
  bottomExtra = DEFAULT_BOTTOM_EXTRA,
  topReserve = 0,
}: Props) {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const minHeight = Math.max(
    240,
    windowHeight -
      insets.top -
      insets.bottom -
      bottomExtra -
      24 -
      topReserve,
  );

  return (
    <View
      style={{
        minHeight,
        width: "100%",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
}
