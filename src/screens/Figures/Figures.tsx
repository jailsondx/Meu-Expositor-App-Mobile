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

              {/*
              <View style={styles.footer}>
                <Text style={styles.price}>
                  {(item.price / 1000).toFixed(3)} {item.coin}
                </Text>
                <Text style={styles.year}>{item.release_year}</Text>
              </View>
            */}
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
                  style={GlobalStyles.buttonPrimary}
                  onPress={() => {
                    // futuramente: add à coleção
                    console.log('Adicionar à coleção', selectedFigure.id);
                  }}
                >
                  <Text style={GlobalStyles.buttonPrimaryText}>
                    Adicionar à Coleção
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


    </SafeAreaView>
  );
}
