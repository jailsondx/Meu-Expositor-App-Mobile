import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useCallback } from 'react';
import CollectionFigureItem from './CollectionFigureItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../../services/api';
import { RouteProp, useRoute } from '@react-navigation/native';

//IMPORT COMPONENTES
//import FlatList_ItemsMin from '../../components/FlatListItems/FlatList_ItemsMin';

//IMPORT STYLES
import GlobalStyles from '../../Styles/GlobalStyles';
import FlatListStyles from '../../Styles/FlatListStyles';
import { SearchBar } from '../../components/SearchBar';
import { FigureModal } from '../../components/Modal/FigureModal';


type RouteParams = {
  ItensColecao: {
    collectionId: number;
    collectionName: string;
  };
};

export default function ItensColecao() {
  const route = useRoute<RouteProp<RouteParams, 'ItensColecao'>>();
  const { collectionId, collectionName } = route.params;
  const [listFigures, setListFigures] = useState<any[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (collectionId) {
      getAllCollectionsUser();
    }
  }, [collectionId]);


  async function getAllCollectionsUser() {
    try {
      const response = await api.get('/get/getCollectionById', {
        params: { collectionId },
      });

      setListFigures(response.data.data);
    } catch (error) {
      console.log('Erro ao carregar coleção', error);
    }
  }

  async function removeFigure() {
    await api.delete(`/delete/remove-figure/${selectedFigure.id}`);
    //setIsInCollection(false);
  }

  const openFigure = useCallback((figure: any) => {
    setSelectedFigure(figure);
    setModalVisible(true);
  }, []);


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

        <View style={GlobalStyles.modalButtons}>
          <TouchableOpacity
            style={GlobalStyles.modalButtonRemove}
            onPress={() => {
              removeFigure();
              closeModal();
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
