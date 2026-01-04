import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';

// Styles
import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';

export default function Colecao() {
  const navigation = useNavigation<any>();
  const [collections, setCollections] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    getAllCollectionsUser();
  }, []);

  async function getAllCollectionsUser() {
    const response = await api.get('/get/getAllCollectionsUser');
    setCollections(response.data.data);
  }

  async function createCollection() {
    await api.post('/post/createCollection', {
      name,
    });

    setName('');
    setModalVisible(false);
    getAllCollectionsUser();
  }

  // 3. Função para navegar para a tela de detalhes
  function navigateToCollectionDetail(collectionId: any) {
    navigation.navigate('CollectionDetail', { collectionId });
  }

  function renderRightActions(collectionId: number) {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(collectionId)}
      >
        <EvilIcons name="trash" size={24} color="white" />
      </TouchableOpacity>
    );
  }


  function confirmDelete(collectionId: number) {
    Alert.alert(
      'Excluir coleção',
      'Tem certeza que deseja apagar esta coleção?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => deleteCollection(collectionId),
        },
      ]
    );
  }

  async function deleteCollection(collectionId: number) {
    try {
      await api.delete(`/delete/collection/${collectionId}`);
      getAllCollectionsUser();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar a coleção');
    }
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
          <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('ItensColecao', {
                  collectionName: item.name,
                  collectionId: item.id,
                })
              }
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
            </TouchableOpacity>
          </Swipeable>

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
