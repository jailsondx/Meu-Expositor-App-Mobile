import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
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

  function openFigure(figure: any) {
    setSelectedFigure(figure);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedFigure(null);
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={FlatListStyles.title}>{collectionName || '?Coleção Indefinida?'}</Text>
      </View>


      <SearchBar
        url={'/get/getCollectionById'}
        onResults={setListFigures}
        collectionId={collectionId}
      />

      <FlatList
        style={FlatListStyles.flatList}
        data={listFigures}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={FlatListStyles.cardMinor}
            activeOpacity={0.8}
            onPress={() => openFigure(item)}
          >
            <View style={FlatListStyles.imageContainerMinor}>
              <Image
                source={{ uri: item.image_url }}
                style={FlatListStyles.image}
                resizeMode="cover"
              />
            </View>

            <View style={FlatListStyles.infoMinor}>
              <Text style={FlatListStyles.name}>{item.name}</Text>
              <Text style={FlatListStyles.line}>{item.line_name}</Text>
              <Text style={FlatListStyles.line}>{item.brand_name}</Text>
            </View>
          </TouchableOpacity>
        )}

      />

      {/* Modal reutilizável */}
      <FigureModal
        visible={modalVisible}
        figure={selectedFigure}
        onClose={closeModal}
      >
        <View>
          <TouchableOpacity
            style={GlobalStyles.buttonRemove}
            onPress={() => {
              removeFigure();
              closeModal();
            }}
          >
            <Text style={GlobalStyles.buttonPrimaryText}>
              Remover da Coleção
            </Text>
          </TouchableOpacity>
        </View>

      </FigureModal>

    </SafeAreaView>
  );
}
