import { View, Text, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../services/api';
import { RouteProp, useRoute } from '@react-navigation/native';
import { iconMap } from '../../utils/iconMap';

//IMPORT COMPONENTES
//import FlatList_ItemsMin from '../../components/FlatListItems/FlatList_ItemsMin';
import CollectionFigureItem from './CollectionFigureItem';

//IMPORT STYLES
import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';
import FlatListStyles from '../../Styles/FlatListStyles';
import { SearchBar } from '../../components/SearchBar';
import { FigureModal } from '../../components/Modal/FigureModal';


type RouteParams = {
  ItensColecao: {
    collectionId: number;
    collectionName: string;
    collectionIcon: string;
  };
};

export default function ItensColecao() {
  const route = useRoute<RouteProp<RouteParams, 'ItensColecao'>>();
  const { collectionId, collectionName, collectionIcon } = route.params;
  const [listFigures, setListFigures] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (collectionId) {
      getCollectionById();
    }
  }, [collectionId]);

  //EXIBIS A LISTA DE FIGURAS OU A MENSSAGEM DE FIGURAS NÃO ENCONTRADAS
  useEffect(() => {
    if (listFigures.length === 0) {
      setMessage('Nenhuma Figure Encontrada');
    } else {
      setMessage('');
    }
  }, [listFigures]);



  async function getCollectionById() {
    try {
      const response = await api.get('/get/getCollectionById', {
        params: { collectionId },
      });

      const itens = response.data.data;
      setListFigures(itens);

    } catch (error) {
      console.log('Erro ao carregar coleção', error);
    }
  }


  function confirmDelete(collectionId: number) {
    Alert.alert(
      'Remover item da coleção',
      'Tem certeza que deseja remover este item da coleção?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => removeToCollection(collectionId),
        },
      ]
    );
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
      // Atualiza a lista localmente, removendo o item
      setListFigures(prev => prev.filter(f => f.id !== selectedFigure?.id));

      setModalVisible(false);
      setSelectedFigure(null);
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Erro de conexão com o servidor - Remover da Coleção';
      Alert.alert('Error', message);
    }
  }

  //ABRIR MODAL DA FIGURE
  const openFigure = useCallback((figure: any) => {
    setSelectedFigure(figure);
    setModalVisible(true);
  }, []);


  //FECHAR O MODAL DA FIGURE
  function closeModal() {
    setModalVisible(false);
    setSelectedFigure(null);
  }


  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <CollectionFigureItem item={item} onPress={openFigure} />
    ),
    [openFigure]
  );


  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View>
        <View style={GlobalStyles.header}>
          <Image
            style={styles.iconImage}
            source={iconMap[collectionIcon] || iconMap.default}
          />
          <Text style={FlatListStyles.title}>{collectionName || '?Coleção Indefinida?'}</Text>
        </View>

        <SearchBar
          url={'/post/SearchFiguresInCollection'}
          onResults={setListFigures}
          collectionId={collectionId}
        />
      </View>


      <View>
        <FlatList
          style={FlatListStyles.flatList}
          data={listFigures}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.title}>
              {message}
            </Text>
          }
        />
      </View>


      {/* Modal reutilizável */}
      <FigureModal
        visible={modalVisible}
        figure={selectedFigure}
        onClose={closeModal}
      >

        <View style={GlobalStyles.modalButtons}>
          <TouchableOpacity
            style={GlobalStyles.modalButtonRemove}
            onPress={() => {
              confirmDelete(collectionId);
            }}
          >
            <Text style={GlobalStyles.buttonTextSmall}>
              Remover da Coleção
            </Text>
          </TouchableOpacity>
        </View>

      </FigureModal>

    </SafeAreaView>
  );
}
