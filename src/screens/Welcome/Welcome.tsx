import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import GlobalStyles from '../../GlobalStyles';

export default function Welcome({ navigation }: any) {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Expositor</Text>
        <Text style={styles.subtitle}>
          Organize e exiba seus produtos de forma simples
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={GlobalStyles.buttonPrimary}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={GlobalStyles.buttonPrimaryText}>Fazer Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={GlobalStyles.buttonSecondary}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={GlobalStyles.buttonSecondaryText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
