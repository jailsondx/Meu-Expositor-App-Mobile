import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';


import styles from './styles';
import GlobalStyles from '../../GlobalStyles';

export default function Home() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.subtitle}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
