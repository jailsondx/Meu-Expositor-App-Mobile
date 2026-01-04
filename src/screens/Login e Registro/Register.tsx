import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';

import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';


export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    setNome('');
    setEmail('');
    setSenha('');
  }, []);

  async function handleRegister() {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);

      await api.post('/auth/register', {
        nome,
        email,
        senha,
      });

      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            }),
          },
        ]
      );


    } catch (error: any) {
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Erro ao criar conta'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.form}>
        <View style={styles.formHeader}>
          <Text style={styles.title}>Usuário Novo?</Text>
        </View>

        <View style={styles.formInputs}>
          <TextInput
            style={styles.input}
            placeholder="Como devo te chamar? (Nome)"
            placeholderTextColor="gray"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Insira seu melhor Email"
            placeholderTextColor="gray"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Capriche Senha"
            placeholderTextColor="gray"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={GlobalStyles.buttonPrimary}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={GlobalStyles.buttonPrimaryText}>
              {loading ? 'Criando...' : 'Criar conta'}
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
