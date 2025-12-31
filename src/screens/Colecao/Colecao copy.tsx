import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';

//Styles
import styles from './styles';
import GlobalStyles from '../../GlobalStyles';

export default function Colecao() {
  const [collections, setCollections] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {
    const response = await api.get('/collection/loadCollections');
    setCollections(response.data.data);
  }


  async function createCollection() {
    await api.post('/collection/createCollection', {
      name,
    });

    setName('');
    setModalVisible(false);
    loadCollections();
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={styles.title}>Minhas Coleções</Text>
      </View>

      <FlatList
        data={collections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Coleção</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da coleção"
              value={name}
              onChangeText={setName}
            />

            <TouchableOpacity
              style={GlobalStyles.buttonPrimary}
              onPress={createCollection}
            >
              <Text style={GlobalStyles.buttonPrimaryText}>Criar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
