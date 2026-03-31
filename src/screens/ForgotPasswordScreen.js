import { View, Text, TextInput, Button } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Recuperar Senha</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <Button title="Enviar" onPress={() => navigation.goBack()} />
    </View>
  );
}
