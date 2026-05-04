import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
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

  function formatPrice(digits) {
    if (!digits) return "";
    const cents = parseInt(digits, 10);
    return (cents / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handlePriceChange(text) {
    const digits = text.replace(/\D/g, "");
    setPrice(digits);
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
      price: formatPrice(price),
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
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?",
    );

    if (!confirmDelete) return;

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
  }

  useEffect(() => {
    if (route.params?.scannedBarcode) {
      setName(route.params.currentName ?? name);
      setPrice(route.params.currentPrice ?? price);
      setBarcode(String(route.params.scannedBarcode));
    }
  }, [route.params?.scannedBarcode]);

  function handleOpenScanner() {
    navigation.navigate("BarcodeScanner", { currentName: name, currentPrice: price });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 24, marginTop: 40, marginBottom: 20 }}>
          Bem-vindo!
        </Text>

        <View style={{ marginBottom: 20 }}>
          <Button title="Ler código de barras" onPress={handleOpenScanner} />
        </View>

        <TextInput
          placeholder="Nome do produto"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            marginBottom: 10,
            padding: 10,
            borderRadius: 5,
          }}
        />

        <TextInput
          placeholder="Preço"
          value={formatPrice(price)}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            marginBottom: 10,
            padding: 10,
            borderRadius: 5,
          }}
        />

        <TextInput
          placeholder="Código de barras"
          value={barcode}
          onChangeText={setBarcode}
          style={{
            borderWidth: 1,
            marginBottom: 20,
            padding: 10,
            borderRadius: 5,
          }}
        />

        <Button
          title={editingProductId ? "Atualizar produto" : "Cadastrar produto"}
          onPress={handleSaveProduct}
        />

        {editingProductId && (
          <View style={{ marginTop: 10 }}>
            <Button title="Cancelar edição" onPress={handleCancelEdit} />
          </View>
        )}

        <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 10 }}>
          Produtos cadastrados
        </Text>

        {products.length === 0 ? (
          <Text>Nenhum produto cadastrado.</Text>
        ) : (
          products.map((item) => (
            <View
              key={item.id}
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <Text>Nome: {item.name}</Text>
              <Text>Preço: {item.price}</Text>
              <Text>Código de barras: {item.barcode || "Não informado"}</Text>

              <View style={{ marginTop: 10 }}>
                <Button title="Editar" onPress={() => handleEditProduct(item)} />
              </View>

              <View style={{ marginTop: 10 }}>
                <Button
                  title="Excluir"
                  onPress={() => handleDeleteProduct(item.id)}
                />
              </View>
            </View>
          ))
        )}

        <View style={{ marginTop: 20 }}>
          <Button title="Sair" onPress={() => navigation.navigate("Login")} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
