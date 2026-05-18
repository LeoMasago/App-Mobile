import { useEffect, useState } from "react";
import { View, Text, Alert, FlatList } from "react-native";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import AppButton from "../components/AppButton";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../firebase/productService";

export default function HomeScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [barcode, setBarcode] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  function formatPriceBR(value) {
    const onlyNumbers = value.replace(/\D/g, "");

    if (!onlyNumbers) {
      return "";
    }

    const numberValue = Number(onlyNumbers) / 100;

    return numberValue.toLocaleString("pt-BR", {
      style: "currency", currency: "BRL",
    });
  }

  function handlePriceChange(text) {
    const formattedPrice = formatPriceBR(text);
    setPrice(formattedPrice);
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

  useEffect(() => {
    loadProducts();
  }, []);

  function clearForm() {
    setName("");
    setPrice("");
    setBarcode("");
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
    setEditingProductId(product.id);
  }

  function handleCancelEdit() {
    clearForm();
  }

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

              if (editingProductId === productId) {
                clearForm();
              }

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
      className="flex-1"
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <ProductForm
          name={name}
          price={price}
          barcode={barcode}
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
        <Text className="text-gray-500">Nenhum produto cadastrado.</Text>
      }
      ListFooterComponent={
        <AppButton
          title="Sair"
          onPress={() => navigation.navigate("Login")}
          variant="secondary"
          className="mt-5 mb-10"
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
