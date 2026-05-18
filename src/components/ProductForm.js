import { View, Text, Keyboard, StyleSheet } from "react-native";
import FormInput from "./FormInput";
import AppButton from "./AppButton";

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
      <Text style={styles.title}>Bem-vindo!</Text>

      <AppButton
        title="Ler código de barras"
        onPress={handleOpenScanner}
        variant="secondary"
        style={styles.scannerButton}
      />

      <FormInput
        placeholder="Nome do produto"
        value={name}
        onChangeText={setName}
      />

      <FormInput
        placeholder="Preço"
        value={price}
        onChangeText={handlePriceChange}
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={true}
      />

      <FormInput
        placeholder="Código de barras"
        value={barcode}
        onChangeText={setBarcode}
        style={styles.lastInput}
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

      <Text style={styles.listTitle}>Produtos cadastrados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 40,
    marginBottom: 20,
  },
  scannerButton: {
    marginBottom: 20,
  },
  lastInput: {
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 8,
  },
  listTitle: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 12,
  },
});
