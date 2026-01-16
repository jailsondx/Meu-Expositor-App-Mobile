import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { getUser } from '../../services/storage';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';

export default function Home() {
  const { signOut } = useAuth();
  const [userName, setUserName] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const name = await getUser();
      if (name) {
        setUserName(name);
      }
    }
    loadUser();
  }, []);

  function toggleMenu() {
    setMenuVisible(prev => !prev);
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.header}>
        <View style={styles.headerUser}>
          <Text style={styles.msg}>Bem Vindo</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="ellipsis-vertical" size={24} color="#E8EBF0" />
          </TouchableOpacity>

          {menuVisible && (
            <View style={styles.menu}>
              <TouchableOpacity onPress={signOut}>
                <Text style={styles.menuItem}>Sair</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
