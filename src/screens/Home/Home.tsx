import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';


import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';

export default function Home() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={styles.title}>Inicio</Text>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.subtitle}>Sair/Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
