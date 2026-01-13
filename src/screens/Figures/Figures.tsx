import { View, Text, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
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

export default function Figures() {
  const [listFigures, setListFigures] = useState<any[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  //Função que será chamada quando o usuário escolher a coleção
  const [onSelectCollection, setOnSelectCollection] = useState<((collectionId: number) => void) | null>(null);

  //Função para filtrar as coleções
  const [collectionsOfFigure, setCollectionsOfFigure] = useState<number[]>([]);
  const [actionType, setActionType] = useState<'add' | 'remove'>('add');

  //STATES DAS FIGURES EM RELAÇÃO A COLEÇÃO
  const [collections, setCollections] = useState<any[]>([]);
  const [collectionName, setCollectionName] = useState<string[]>([]);
  const [isInCollection, setIsInCollection] = useState(false);
  const [collectionPickerVisible, setCollectionPickerVisible] = useState(false);

  //PAGINAÇÃO LAXY LOADING
  const [searchParams, setSearchParams] = useState<any | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getRecentFigures();
  }, []);

  //RENDERIZAÇÃO OS ITENS DA FLATLIST
  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <FigureItem item={item} onPress={openFigure} />
    ),
    []
  );

  //Quando você abre a modal para add ou remove, você filtra as coleções antes de mostrar
  const filteredCollections = collections.filter((collection) => {
    if (actionType === 'add') {
      // Só mostrar coleções que ainda NÃO tem a figure
      return !collectionsOfFigure.includes(collection.id);
    } else {
      // Só mostrar coleções que JÁ tem a figure
      return collectionsOfFigure.includes(collection.id);
    }
  });


  //LAZY LOADING PARA CARREGAR MAIS ITENS
  async function loadMore() {
    if (!hasMore || !searchParams || loadingMore) return;

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const response = await api.post('/post/SearchFigures', {
        ...searchParams,
        page: nextPage,
      });

      const data = response.data.data;

      setListFigures(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === 20);
    } finally {
      setLoadingMore(false);
    }
  }


  //OBTEM AS FIGURES RECENTES ADD
  //QUANTIDADE DEVE SER AJUSTADA NA FUNÇÃO DO BACKEND
  async function getRecentFigures() {
    try {
      const response = await api.get('/get/RecentFigures');
      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
        return;
      }
      setListFigures(response.data.data);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro de conexão com o servidor';
      Alert.alert('Error', message);
    }
  }


  //OBTEM AS COLEÇÕES DO USUARIO E A AÇÃO DE ADICIONAR OU REMOVER
  async function openCollectionPicker(action: 'add' | 'remove') {
    try {
      const response = await api.get('/get/getAllCollectionsUser');

      if (!response.data.success) {
        Alert.alert('Error', response.data.message);
        return;
      }

      setCollections(response.data.data);
      setCollectionPickerVisible(true);
      setActionType(action); // 'add' ou 'remove'

      // Define qual função será chamada ao clicar na coleção
      setOnSelectCollection(() => (action === 'add' ? addToCollection : removeToCollection));
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Erro de conexão com o servidor - Listar Coleções';
      Alert.alert('Error', message);
    }
  }


  //ADICIONA FIGURE A COLEÇÃO
  async function addToCollection(collectionId: number) {
    try {
      const response = await api.post(`/post/${collectionId}/addFigure`, {
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
        error.response?.data?.message || 'Erro de conexão com o servidor - Adicionar a Coleção';

      Alert.alert('Error', message);
    }
  }

  //REMOVER FIGURE DA COLEÇÃO
  async function removeToCollection(collectionId: number) {
    try {
      const response = await api.delete(`/delete/${collectionId}/removeFigure`, {
        data: {
          figureId: selectedFigure.id,
        },
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
        error.response?.data?.message || 'Erro de conexão com o servidor - Remover da Coleção';

      Alert.alert('Error', message);
    }
  }

  //ABRE MODAL DA FIGURE
  const openFigure = useCallback(async (figure: any) => {
    setSelectedFigure(figure);
    setModalVisible(true);

    const response = await api.get('/get/figureStatus', {
      params: { figureId: figure.id },
    });

    const collectionsOfFigure = response.data.data.map(
      (item: any) => item.collection_id // pegar o id das coleções que já têm essa figure
    );

    setCollectionName(response.data.data.map((item: any) => item.collection_name));
    setIsInCollection(collectionsOfFigure.length > 0);
    setCollectionsOfFigure(collectionsOfFigure); // novo estado
  }, []);


  //FECHA MODAL
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
          url="/post/SearchFigures"
          onResults={(data, params) => {
            setListFigures(data);
            setSearchParams(params);
            setPage(1);
            setHasMore(data.length === 20);
          }}
        />
      </View>

      <View>
        <FlatList
          style={FlatListStyles.flatList}
          data={listFigures}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          initialNumToRender={10}       //Quantos Itens renderizar inicialmente
          maxToRenderPerBatch={10}      // quantos itens renderizar por batch
          windowSize={5}                // número de telas renderizadas fora da visão
          removeClippedSubviews={true}  // remove itens fora da tela
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
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
            onPress={() => openCollectionPicker('remove')}
          >
            <Text style={GlobalStyles.buttonTextSmall}>
              Remover da Coleção
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.modalButtonPrimary}
            onPress={() => openCollectionPicker('add')}
          >
            <Text style={GlobalStyles.buttonTextSmall}>
              Adicionar à Coleção
            </Text>
          </TouchableOpacity>
        </View>

      </FigureModal>

      {/*MODAL DE ESCOLHER A COLEÇÃO PARA ADICIONAR/REMOVER A FIGURE*/}
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
                data={filteredCollections} // lista filtrada
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      GlobalStyles.buttonPrimary, // estilo base
                      actionType === 'remove' && GlobalStyles.buttonRemove, // estilo extra para remover
                    ]}
                    onPress={() => {
                      if (onSelectCollection) onSelectCollection(item.id);
                    }}
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