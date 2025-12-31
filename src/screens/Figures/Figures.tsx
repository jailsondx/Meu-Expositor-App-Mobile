import { View, Text, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';

//componentes
import { SearchBar } from '../../components/SearchBar';

//styles
import styles from './styles';
import GlobalStyles from '../../GlobalStyles';

export default function Figures({ navigation }: any) {
  const [listFigures, setListFigures] = useState<any[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  //STATES DAS FIGURES EM RELAÇÃO A COLEÇÃO
  const [collections, setCollections] = useState<any[]>([]);
  const [isInCollection, setIsInCollection] = useState(false);
  const [collectionPickerVisible, setCollectionPickerVisible] = useState(false);


  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      const response = await api.get('/get/RecentFigures');
      setListFigures(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function openCollectionPicker() {
    const response = await api.get('/collection/loadCollections');
    setCollections(response.data.data);
    setCollectionPickerVisible(true);
  }

  async function addToCollection(collectionId: number) {
    await api.post(`/collection/${collectionId}/add-figure`, {
      figureId: selectedFigure.id,
    });

    setCollectionPickerVisible(false);
    setIsInCollection(true);
  }

  async function removeFigure() {
    await api.delete(`/collection/remove-figure/${selectedFigure.id}`);
    setIsInCollection(false);
  }


  async function openFigure(figure: any) {
    setSelectedFigure(figure);
    setModalVisible(true);
    const response = await api.get(`/collection/figure-status`, {
        params: { figureId: figure.id },
      });

    setIsInCollection(response.data.data.length > 0);
  }

  function closeModal() {
    setModalVisible(false);
    setSelectedFigure(null);
  }


  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={styles.title}>Lista de Figures</Text>
      </View>

      <SearchBar
        url={'/post/SearchFigures'}
        onResults={setListFigures}
      />

      <FlatList
        style={styles.flatList}
        data={listFigures}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
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
              <Text style={styles.brand}>{item.brand_name}</Text>

              <View style={styles.footer}>
                <Text style={styles.year}>{item.release_year}</Text>
              </View>
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
            {selectedFigure && (
              <>
                <Image
                  source={{ uri: selectedFigure.image_url }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />

                <Text style={styles.modalName}>{selectedFigure.name}</Text>
                <Text style={styles.modalLine}>{selectedFigure.line_name}</Text>
                <Text style={styles.modalBrand}>{selectedFigure.brand_name}</Text>

                <Text style={styles.modalPrice}>
                  {(selectedFigure.price / 1000).toFixed(3)} {selectedFigure.coin}
                </Text>

                <Text style={styles.modalYear}>
                  Lançamento: {selectedFigure.release_year}
                </Text>

                <TouchableOpacity
                  style={[
                    GlobalStyles.buttonPrimary,
                    isInCollection && { backgroundColor: '#c0392b' },
                  ]}
                  onPress={() => {
                    if (isInCollection) {
                      removeFigure();
                    } else {
                      openCollectionPicker();
                    }
                  }}
                >
                  <Text style={GlobalStyles.buttonPrimaryText}>
                    {isInCollection ? 'Remover da Coleção' : 'Adicionar à Coleção'}
                  </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.modalClose}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>


      <Modal visible={collectionPickerVisible} transparent animationType="fade">
        <View style={GlobalStyles.modalOverlay}>
          <View style={GlobalStyles.modalCardAuto}>
            <View style={GlobalStyles.cardModalTitle}>
              <Text style={GlobalStyles.modalTitle}>Escolha uma coleção</Text>
            </View>


            <View style={GlobalStyles.modalContent}>
              <FlatList
                data={collections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.collectionItem}
                    onPress={() => addToCollection(item.id)}
                  >
                    <Text style={styles.collectionItemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setCollectionPickerVisible(false)}>
                <Text style={styles.modalClose}>Cancelar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>



    </SafeAreaView>
  );
}
