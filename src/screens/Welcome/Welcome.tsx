import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';
import LogoStyles from '../../Styles/LogoStyles';

export default function Welcome({ navigation }: any) {
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={LogoStyles.viewLogo}>
        <Image
          source={require('../../assets/logo/LOGO-MeuExpositor.png')}
          style={LogoStyles.imageLogo}
          resizeMode="contain"
        />
        <Text style={GlobalStyles.title}>MEU EXPOSITOR</Text>
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
