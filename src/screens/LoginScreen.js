import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry={true}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <Button title="Entrar" onPress={() => navigation.navigate('Home')} />

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={{ marginTop: 10 }}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
        <Text style={{ marginTop: 10 }}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
}
