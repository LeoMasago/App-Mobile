import { TouchableOpacity, Text, StyleSheet } from "react-native";

const variantColors = {
  primary: "#2563EB",
  danger: "#EF4444",
  secondary: "#9CA3AF",
};

export default function AppButton({ title, onPress, variant = "primary", style }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: variantColors[variant] ?? variantColors.primary }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
