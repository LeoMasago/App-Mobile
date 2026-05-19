import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, radius, shadows } from "../theme";

const variants = {
  primary: {
    background: colors.primary,
    text: colors.white,
    shadow: shadows.lg,
  },
  danger: {
    background: colors.danger,
    text: colors.white,
    shadow: shadows.sm,
  },
  secondary: {
    background: colors.surface,
    text: colors.textSecondary,
    shadow: shadows.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
};

export default function AppButton({ title, onPress, variant = "primary", style }) {
  const v = variants[variant] ?? variants.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: v.background,
          borderWidth: v.borderWidth ?? 0,
          borderColor: v.borderColor ?? 'transparent',
        },
        v.shadow,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Text style={[styles.text, { color: v.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.md,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.2,
  },
});
