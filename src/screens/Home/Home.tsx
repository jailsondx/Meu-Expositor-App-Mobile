import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { getUser } from '../../services/storage';
import { useEffect, useState } from 'react';


import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';

export default function Home() {
  const { signOut } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function loadUser() {
      const name = await getUser();
      if (name) {
        setUserName(name);
      }
    }

    loadUser();
  }, []);


  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.header}>
    <View style={styles.headerUser}>
            <Text style={styles.msg}>Bem Vindo</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>

          <View>
            <TouchableOpacity onPress={signOut}>
              <Text style={styles.msg}>Sair/Logout</Text>
            </TouchableOpacity>
          </View>
      </View>
     
    </SafeAreaView>
  );
}
