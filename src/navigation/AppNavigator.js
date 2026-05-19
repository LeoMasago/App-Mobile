import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.primary,
  headerTitleStyle: { fontWeight: '700', color: colors.textPrimary },
  headerShadowVisible: false,
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={headerStyle}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} options={{ title: 'Criar conta' }} />
        <Stack.Screen name="EsqueciSenha" component={ForgotPasswordScreen} options={{ title: 'Recuperar senha' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Estoque', headerShown: false }} />
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScannerScreen}
          options={{ title: 'Ler código de barras' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
