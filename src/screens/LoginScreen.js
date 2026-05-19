import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { loginUser } from '../firebase/authService';
import FormInput from '../components/FormInput';
import AppButton from '../components/AppButton';
import { colors, radius, shadows, spacing, typography } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }
    try {
      await loginUser(email.trim(), password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
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
          <Text style={styles.appName}>Aplicativo de Estoque</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo</Text>
          <Text style={styles.cardSubtitle}>Faça login para continuar</Text>

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

          <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')} style={styles.forgotLink}>
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <AppButton title="Entrar" onPress={handleLogin} style={styles.loginBtn} />
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerPrompt}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.registerLink}>Criar conta</Text>
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
  appName: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.md,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    ...typography.caption,
    marginBottom: spacing.lg,
    fontSize: 14,
  },
  inputSpacing: {
    marginBottom: spacing.md,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    marginTop: -spacing.xs,
  },
  forgotText: {
    ...typography.link,
    fontSize: 13,
  },
  loginBtn: {
    marginTop: spacing.xs,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPrompt: {
    ...typography.caption,
    fontSize: 15,
  },
  registerLink: {
    ...typography.link,
    fontSize: 15,
  },
});
