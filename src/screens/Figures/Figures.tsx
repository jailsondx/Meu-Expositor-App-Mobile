import { View, Text, TouchableOpacity, FlatList, Image, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import FigureItem from './FigureItem';
import { api } from '../../services/api';

//componentes
import { SearchBar } from '../../components/SearchBar';

//styles
import styles from './styles';
import FlatListStyles from '../../Styles/FlatListStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import { FigureModal } from '../../components/Modal/FigureModal';

export default function Figures({ navigation }: any) {
  const [listFigures, setListFigures] = useState<any[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  //STATES DAS FIGURES EM RELAÇÃO A COLEÇÃO
  const [collections, setCollections] = useState<any[]>([]);
  const [collectionName, setCollectionName] = useState<string[]>([]);
  const [isInCollection, setIsInCollection] = useState(false);
  const [collectionPickerVisible, setCollectionPickerVisible] = useState(false);


  useEffect(() => {
    getRecentFigures();
  }, []);


  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <FigureItem item={item} onPress={openFigure} />
    ),
    []
  );


  //OBTEM AS FIGURES RECENTES ADD
  //QUANITDADE DEVE SER AJUSTADA NA FUNÇÃO DO BACKEND
  async function getRecentFigures() {
    try {
      const response = await api.get('/get/RecentFigures');
      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
        return;
      }

      setListFigures(response.data.data);
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Erro de conexão com o servidor';
      Alert.alert('Error', message);
    }
  }


  //OBTEM AS COLEÇÕES DO USUARIO
  async function openCollectionPicker() {
    try {
      const response = await api.get('/get/getAllCollectionsUser');

      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
        return;
      }

      setCollections(response.data.data);
      setCollectionPickerVisible(true);

    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Erro de conexão com o servidor';
      Alert.alert('Error', message);
    }
  }

  //ADICIONA FIGURE A COLEÇÃO
  async function addToCollection(collectionId: number) {
    try {
      const response = await api.post(`/post/${collectionId}/add-figure`, {
        figureId: selectedFigure.id,
      });

      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
        return;
      }

      setCollectionPickerVisible(false);
      setIsInCollection(true);
      setModalVisible(false);
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Erro de conexão com o servidor';

      Alert.alert('Error', message);
    }
  }


  async function removeFigure() {
    await api.delete(`/delete/remove-figure/${selectedFigure.id}`);
    setIsInCollection(false);
  }


  const openFigure = useCallback(async (figure: any) => {
    setSelectedFigure(figure);
    setModalVisible(true);

    const response = await api.get('/get/figureStatus', {
      params: { figureId: figure.id },
    });

    const collections = response.data.data.map(
      (item: any) => item.collection_name
    );

    setCollectionName(collections);
    setIsInCollection(collections.length > 0);
  }, []);


  function closeModal() {
    setModalVisible(false);
    setSelectedFigure(null);
  }


  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View>
        <View style={GlobalStyles.header}>
          <Text style={FlatListStyles.title}>Lista de Figures</Text>
        </View>

        <SearchBar
          url={'/post/SearchFigures'}
          onResults={setListFigures}
        />

      </View>

      <View>
        <FlatList
          style={FlatListStyles.flatList}
          data={listFigures}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
        />
      </View>



      {/* Modal reutilizável */}
      <FigureModal
        visible={modalVisible}
        figure={selectedFigure}
        onClose={closeModal}
      >
        {/*AQUI ABAIXO FICA COMO O CSS buttons NO STYLE DO COMPONENT FIGURE MODAL*/}
        <Text style={styles.subtitle}>
          Suas Coleções: {collectionName.join(', ')}
        </Text>


        <View style={GlobalStyles.modalButtons}>
          <TouchableOpacity
            style={GlobalStyles.modalButtonRemove}
            onPress={() => { removeFigure(); }}
          >
            <Text style={GlobalStyles.buttonTextSmall}>
              Remover da Coleção
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.modalButtonPrimary}
            onPress={() => { openCollectionPicker(); }}
          >
            <Text style={GlobalStyles.buttonTextSmall}>
              Adicionar à Coleção
            </Text>
          </TouchableOpacity>
        </View>
      </FigureModal>



      {/*MODAL DE ESCOLHER A COLEÇÃO PARA ADICIONAR A FIGURE*/}
      <Modal visible={collectionPickerVisible} transparent animationType="fade">
        <View style={GlobalStyles.modalOverlay}>
          <View style={GlobalStyles.modalCardMinor}>
            <View style={GlobalStyles.cardModalTitle}>
              <Text style={GlobalStyles.modalTitle}>Escolha uma coleção</Text>
            </View>
            <TouchableOpacity
              style={GlobalStyles.modalCloseButton}
              onPress={() => setCollectionPickerVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={GlobalStyles.modalCloseButtonText}>×</Text>
            </TouchableOpacity>

            <View style={GlobalStyles.modalContent}>
              <FlatList
                style={FlatListStyles.flatList}
                data={collections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={GlobalStyles.buttonPrimary}
                    onPress={() => addToCollection(item.id)}
                  >
                    <Text style={GlobalStyles.buttonPrimaryText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
