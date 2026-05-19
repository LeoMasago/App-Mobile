import { View, Text, StyleSheet } from "react-native";
import AppButton from "./AppButton";
import { colors, radius, shadows, spacing, typography } from "../theme";

function Field({ label, value }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

export default function ProductCard({ item, onEdit, onDelete }) {
  const locationText = item.location
    ? `${item.location.latitude.toFixed(5)}, ${item.location.longitude.toFixed(5)}`
    : "Não capturada";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      <View style={styles.divider} />

      <Field label="Código de barras" value={item.barcode || "Não informado"} />
      <Field label="Localização" value={locationText} />

      <View style={styles.actions}>
        <AppButton
          title="Editar"
          onPress={onEdit}
          variant="secondary"
          style={styles.actionBtn}
        />
        <AppButton
          title="Excluir"
          onPress={onDelete}
          variant="danger"
          style={styles.actionBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  productName: {
    ...typography.h3,
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.sm,
  },
  field: {
    marginBottom: spacing.xs,
  },
  fieldLabel: {
    ...typography.label,
    marginBottom: 2,
  },
  fieldValue: {
    ...typography.body,
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
  },
});
