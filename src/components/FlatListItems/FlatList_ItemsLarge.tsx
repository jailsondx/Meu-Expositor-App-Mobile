import { View, Text, TouchableOpacity, FlatList, Image, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

//componentes
import { SearchBar } from '../SearchBar';
import { FigureModal } from '../Modal/FigureModal';

//styles
import styles from './styles';
import GlobalStyles from '../../Styles/GlobalStyles';


type Props = {
  url: string;
  urlSearch: string;
  collectionId?: number;
};

export default function FlatList_ItemsLarge({ url, urlSearch, collectionId }: Props) {
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
      const response = await api.get(url, {
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

      <SearchBar
        url={urlSearch}
        onResults={setListFigures}
        collectionId={collectionId}
      />

      <FlatList
        style={styles.flatList}
        data={listFigures}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => openFigure(item)}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image_url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.line}>{item.line_name}</Text>
              <Text style={styles.line}>{item.brand_name}</Text>
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
      </FigureModal>



    </SafeAreaView>
  );
}
