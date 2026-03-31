import { View, Text, TextInput, Button } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Cadastro</Text>

      <TextInput
        placeholder="Nome"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry={true}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <Button title="Cadastrar" onPress={() => navigation.goBack()} />
    </View>
  );
}
