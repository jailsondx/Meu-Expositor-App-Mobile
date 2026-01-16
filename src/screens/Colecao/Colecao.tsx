import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { api } from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { iconMap } from '../../utils/iconMap';


// Styles
import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';
import FlatListStyles from '../../Styles/FlatListStyles';

export default function Colecao() {
  const navigation = useNavigation<any>();
  const [collections, setCollections] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string>('default');


  useEffect(() => {
    getAllCollectionsUser();
  }, []);

  async function getAllCollectionsUser() {
    const response = await api.get('/get/getAllCollectionsUser');
    setCollections(response.data.data);
  }

  async function CreateCollection() {
    await api.post('/post/CreateCollection', {
      name,
      icon: selectedIcon,
    });

    setName('');
    setSelectedIcon('default');
    setModalVisible(false);
    getAllCollectionsUser();
  }

  function renderRightActions(collectionId: number) {
    return (
      <View style={styles.viewDeleteButton}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => confirmDelete(collectionId)}
        >
          <EvilIcons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>

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
      const result = await api.delete(`/delete/${collectionId}/deleteCollection`);

      const data = result.data;

      if(data.success){
        Alert.alert(data.message);
      }

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
        style={FlatListStyles.flatList}
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
                  collectionId: item.id,
                  collectionName: item.name,
                  collectionIcon: item.icon,
                })
              }
            >
              <View style={styles.viewFlatItem}>
                <View style={styles.flatItem}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={iconMap[item.icon] || iconMap.default}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                </View>

                <View>
                  <Text style={styles.cardTitle}> <EvilIcons name="arrow-right" size={24} color="#E8EBF0" /> </Text>
                </View>
              </View>

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
        <View style={GlobalStyles.modalOverlay}>
          <View style={GlobalStyles.modalCardMinor}>
            <View style={GlobalStyles.cardModalTitle}>
              <Text style={GlobalStyles.modalTitle}>Nova Coleção</Text>
            </View>

            <TouchableOpacity
              style={GlobalStyles.modalCloseButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={GlobalStyles.modalCloseButtonText}>×</Text>
            </TouchableOpacity>

            <View style={GlobalStyles.modalContent}>
              <TextInput
                style={styles.input}
                placeholder="Nome da coleção"
                value={name}
                onChangeText={setName}
              />

              <TouchableOpacity
                style={GlobalStyles.buttonPrimary}
                onPress={CreateCollection}
              >
                <Text style={GlobalStyles.buttonPrimaryText}>Criar</Text>
              </TouchableOpacity>


              <View style={styles.iconGrid}>
                {Object.keys(iconMap)
                  .filter(icon => icon !== 'default')
                  .map((icon) => {
                    const isSelected = selectedIcon === icon;

                    return (
                      <TouchableOpacity
                        key={icon}
                        style={[
                          styles.iconOption,
                          !isSelected && styles.iconDisabled
                        ]}
                        onPress={() => setSelectedIcon(icon)}
                        activeOpacity={0.8}
                      >
                        <Image
                          source={iconMap[icon]}
                          style={styles.iconImage}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </View>

            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
