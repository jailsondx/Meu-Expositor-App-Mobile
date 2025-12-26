import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';

import styles from './styles';
import GlobalStyles from '../../GlobalStyles';
import { api } from '../../services/api';
import { saveUser } from '../../services/storage';

export default function Login() {
  const { signIn } = useAuth();
  const navigation = useNavigation<any>();

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

      // backend retorna: { message, user }
      const { user } = response.data;

      await signIn(user);

      // salva no storage
      await saveUser(user);


    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Email ou senha inválidos'
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
        </View>
      </View>
    </SafeAreaView>
  );
}
