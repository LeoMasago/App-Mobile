import { View, Text, StyleSheet } from "react-native";
import AppButton from "./AppButton";

export default function ProductCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Nome: {item.name}</Text>
      <Text style={styles.text}>Preço: {item.price}</Text>
      <Text style={styles.textLast}>
        Código de barras: {item.barcode || "Não informado"}
      </Text>

      <AppButton title="Editar" onPress={onEdit} style={styles.buttonSpacing} />
      <AppButton title="Excluir" onPress={onDelete} variant="danger" style={styles.buttonSpacing} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    marginBottom: 4,
  },
  textLast: {
    fontSize: 15,
    marginBottom: 12,
  },
  buttonSpacing: {
    marginBottom: 8,
  },
});
