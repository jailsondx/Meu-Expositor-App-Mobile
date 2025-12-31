import { View, Text, TouchableOpacity, FlatList, Image, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

//componentes
import { SearchBar } from '../SearchBar';

//styles
import styles from './styles';
import GlobalStyles from '../../GlobalStyles';


type Props = {
  url: string;
  collectionId: number;
};

export default function Figures_Collection({ url, collectionId }: Props) {
  const [listFigures, setListFigures] = useState<any[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (collectionId) {
      loadCollection();
    }
  }, [collectionId]);

  async function loadCollection() {
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
    await api.delete(`/collection/remove-figure/${selectedFigure.id}`);
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
        url={'/post/SearchFiguresInCollection'}
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

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={GlobalStyles.modalOverlay}>
          <View style={styles.modalCard}>

            {/* Botão fechar */}
            <TouchableOpacity
              style={GlobalStyles.modalCloseButton}
              onPress={closeModal}
              activeOpacity={0.7}
            >
              <Text style={GlobalStyles.modalCloseButtonText}>×</Text>
            </TouchableOpacity>


            <View style={GlobalStyles.modalContent}>
              {selectedFigure && (
                <>
                  <Image
                    source={{ uri: selectedFigure.image_url }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />

                  <Text style={styles.modalName}>{selectedFigure.name}</Text>
                  <Text style={styles.modalInfor}>{selectedFigure.line_name}</Text>
                  <Text style={styles.modalInfor}>{selectedFigure.brand_name}</Text>
                  <Text style={styles.modalInfor}>
                    {(selectedFigure.price / 1000).toFixed(3)} {selectedFigure.coin}
                  </Text>

                  <Text style={styles.modalYear}>
                    Lançamento: {selectedFigure.release_year}
                  </Text>

                  <TouchableOpacity
                    style={GlobalStyles.buttonRemove} onPress={() => { removeFigure(); }}>
                    <Text style={GlobalStyles.buttonPrimaryText}> Remover da Coleção </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
}
