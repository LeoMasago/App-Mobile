import { View, Text, Keyboard, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import AppButton from "./AppButton";
import { colors, radius, shadows, spacing, typography } from "../theme";

export default function ProductForm({
  name,
  price,
  barcode,
  setName,
  handlePriceChange,
  setBarcode,
  editingProductId,
  handleSaveProduct,
  handleCancelEdit,
  handleOpenScanner,
}) {
  return (
    <View>
      <View style={styles.welcomeSection}>
        <Text style={styles.title}>Gestão de Produtos</Text>
        <Text style={styles.subtitle}>Cadastre e gerencie seu estoque</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>
          {editingProductId ? "Editar produto" : "Novo produto"}
        </Text>

        <AppButton
          title="Ler código de barras"
          onPress={handleOpenScanner}
          variant="secondary"
          style={styles.scannerButton}
        />

        <FormInput
          label="Nome do produto"
          placeholder="Ex: Coca-Cola 2L"
          value={name}
          onChangeText={setName}
        />

        <FormInput
          label="Preço"
          placeholder="R$ 0,00"
          value={price}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={true}
        />

        <FormInput
          label="Código de barras"
          placeholder="Escaneie ou digite"
          value={barcode}
          onChangeText={setBarcode}
          containerStyle={styles.lastInput}
        />

        <AppButton
          title={editingProductId ? "Atualizar produto" : "Cadastrar produto"}
          onPress={handleSaveProduct}
        />

        {editingProductId && (
          <AppButton
            title="Cancelar edição"
            onPress={handleCancelEdit}
            variant="secondary"
            style={styles.cancelButton}
          />
        )}
      </View>

      <Text style={styles.listTitle}>Produtos cadastrados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeSection: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    fontSize: 15,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.primary,
  },
  scannerButton: {
    marginBottom: spacing.md,
  },
  lastInput: {
    marginBottom: spacing.md,
  },
  cancelButton: {
    marginTop: spacing.sm,
  },
  listTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
    paddingHorizontal: 4,
  },
});

