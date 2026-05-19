import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { registerUser } from '../firebase/authService';
import FormInput from '../components/FormInput';
import AppButton from '../components/AppButton';
import { colors, radius, shadows, spacing, typography } from '../theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha nome, email e senha.');
      return;
    }
    try {
      await registerUser(email.trim(), password);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao cadastrar', error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoArea}>
          <Text style={styles.pageTitle}>Criar conta</Text>
          <Text style={styles.tagline}>Comece a gerenciar seu estoque hoje</Text>
        </View>

        <View style={styles.card}>
          <FormInput
            label="Nome completo"
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
            containerStyle={styles.inputSpacing}
          />

          <FormInput
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.inputSpacing}
          />

          <FormInput
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            containerStyle={styles.inputSpacing}
          />

          <AppButton title="Criar conta" onPress={handleRegister} style={styles.registerBtn} />
        </View>

        <View style={styles.loginRow}>
          <Text style={styles.loginPrompt}>Já tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    ...shadows.lg,
  },
  logoIcon: {
    fontSize: 40,
  },
  pageTitle: {
    ...typography.h1,
  },
  tagline: {
    ...typography.caption,
    marginTop: spacing.xs,
    fontSize: 14,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.md,
    marginBottom: spacing.lg,
  },
  inputSpacing: {
    marginBottom: spacing.md,
  },
  registerBtn: {
    marginTop: spacing.xs,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    ...typography.caption,
    fontSize: 15,
  },
  loginLink: {
    ...typography.link,
    fontSize: 15,
  },
});
