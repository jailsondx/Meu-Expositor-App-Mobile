import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';
import { api } from '../../services/api';

export default function Login({ navigation }: any) {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/login', {
        email,
        senha,
      });

      // padrão novo
      const token = response.data.data.token;

      await signIn(token);

    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.response?.data?.message || 'Email ou senha inválidos'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.formInputs}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="gray"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={GlobalStyles.buttonPrimary}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={GlobalStyles.buttonPrimaryText}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                })
              )
            }
          >
            <Text style={GlobalStyles.subtitle}>Cancelar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}
