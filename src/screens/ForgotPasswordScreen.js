import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { resetUserPassword } from '../firebase/authService';
import FormInput from '../components/FormInput';
import AppButton from '../components/AppButton';
import { colors, radius, shadows, spacing, typography } from '../theme';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  async function handleResetPassword() {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Informe seu email.');
      return;
    }
    try {
      await resetUserPassword(email.trim());
      Alert.alert('Email enviado', 'Enviamos as instruções de recuperação de senha para seu email.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao enviar email', error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.logoArea}>
          <Text style={styles.pageTitle}>Recuperar senha</Text>
          <Text style={styles.tagline}>
            Enviaremos um link para redefinir sua senha
          </Text>
        </View>

        <View style={styles.card}>
          <FormInput
            label="Email cadastrado"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.inputSpacing}
          />

          <AppButton title="Enviar link de recuperação" onPress={handleResetPassword} />
        </View>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backText}>← Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
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
    marginBottom: spacing.xs,
  },
  tagline: {
    ...typography.caption,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
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
  backLink: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  backText: {
    ...typography.link,
    fontSize: 15,
  },
});
