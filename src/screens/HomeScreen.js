import { useEffect, useState } from "react";
import { View, Text, Alert, FlatList, StyleSheet } from "react-native";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import AppButton from "../components/AppButton";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../firebase/productService";
import { colors, spacing, typography } from "../theme";

export default function HomeScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [location, setLocation] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  function formatPriceBR(value) {
    const onlyNumbers = value.replace(/\D/g, "");
    if (!onlyNumbers) return "";
    const numberValue = Number(onlyNumbers) / 100;
    return numberValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handlePriceChange(text) {
    setPrice(formatPriceBR(text));
  }

  async function loadProducts() {
    try {
      const productList = await getProducts();
      setProducts(productList);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  }

  useEffect(() => { loadProducts(); }, []);

  function clearForm() {
    setName("");
    setPrice("");
    setBarcode("");
    setLocation(null);
    setEditingProductId(null);
  }

  async function handleSaveProduct() {
    if (!name.trim() || !price) {
      Alert.alert("Atenção", "Preencha nome e preço do produto.");
      return;
    }

    const productData = {
      name: name.trim(),
      price: formatPriceBR(price),
      barcode: barcode ? String(barcode).trim() : "",
      location: location || null,
    };

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productData);
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
        await createProduct(productData);
        Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      }
      clearForm();
      await loadProducts();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar o produto.");
    }
  }

  function handleEditProduct(product) {
    setName(product.name || "");
    const digits = (product.price || "").replace(/\D/g, "");
    setPrice(digits);
    setBarcode(product.barcode || "");
    setLocation(product.location || null);
    setEditingProductId(product.id);
  }

  function handleCancelEdit() { clearForm(); }

  async function handleDeleteProduct(productId) {
    Alert.alert(
      "Excluir produto",
      "Tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteProduct(productId);
              if (editingProductId === productId) clearForm();
              Alert.alert("Sucesso", "Produto excluído com sucesso!");
              await loadProducts();
            } catch (error) {
              console.error(error);
              Alert.alert("Erro", "Não foi possível excluir o produto.");
            }
          },
        },
      ]
    );
  }

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      setName(route.params.currentName || "");
      setPrice(route.params.currentPrice || "");
      setBarcode(String(route.params.scannedBarcode));
      setLocation(route.params.scannedLocation || null);
    }
  }, [route.params?.scannedBarcode]);

  function handleOpenScanner() {
    navigation.navigate("BarcodeScanner", {
      currentName: name,
      currentPrice: price,
      currentBarcode: barcode,
    });
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <ProductForm
          name={name}
          price={price}
          barcode={barcode}
          location={location}
          setName={setName}
          handlePriceChange={handlePriceChange}
          setBarcode={setBarcode}
          editingProductId={editingProductId}
          handleSaveProduct={handleSaveProduct}
          handleCancelEdit={handleCancelEdit}
          handleOpenScanner={handleOpenScanner}
        />
      }
      ListEmptyComponent={
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Nenhum produto cadastrado ainda</Text>
          <Text style={styles.emptyHint}>Use o formulário acima para adicionar</Text>
        </View>
      }
      ListFooterComponent={
        <AppButton
          title="Sair"
          onPress={() => navigation.navigate("Login")}
          variant="secondary"
          style={styles.logoutBtn}
        />
      }
      renderItem={({ item }) => (
        <ProductCard
          item={item}
          onEdit={() => handleEditProduct(item)}
          onDelete={() => handleDeleteProduct(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  emptyBox: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  emptyHint: {
    ...typography.caption,
  },
  logoutBtn: {
    marginTop: spacing.lg,
  },
});
