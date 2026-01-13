import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import styles from './styles';

interface Option {
  id: number;
  name: string;
}

interface SearchBarProps {
  url: string;
  collectionId?: number;
  onResults: (data: any[], params: any) => void;
  onSearch?: (data: any[], hasMore: boolean) => void;
  onLoadMore?: () => Promise<any[] | null>;
}

export function SearchBar({ url, collectionId, onResults }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);


  // filtros
  const [brands, setBrands] = useState<Option[]>([]);
  const [lines, setLines] = useState<Option[]>([]);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [lineId, setLineId] = useState<number | null>(null);


  useEffect(() => {
    loadFilters();
  }, []);

  // ===== BUSCA =====
  async function handleSearch() {
    try {
      setLoading(true);

      const params = {
        search: query,
        collectionId,
        brandId,
        lineId,
        page: 1,
        limit: 20,
      };

      const response = await api.post(url, params);

      // sucesso (HTTP 200)
      onResults(response.data.data, params);

    } catch (error: any) {
      console.log('Erro na busca:', error);

      let message = 'Erro ao realizar a busca';

      if (axios.isAxiosError(error)) {
        // erro com resposta do backend
        message =
          error.response?.data?.message ||
          'Erro ao comunicar com o servidor';
      }

      Alert.alert('Atenção', message);
    } finally {
      setLoading(false);
    }
  }

  // ===== GET DOS FILTROS =====
  async function loadFilters() {
    try {
      const result = await api.get('/get/Filters');

      setBrands(result.data.data.brands);
      setLines(result.data.data.lines);
    } catch (error) {
      console.log('Erro ao carregar filtros:', error);
    } finally {
    }
  }

  return (
    <View style={styles.container}>
      {/* INPUT DE TEXTO */}
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Pesquisar por nome da figure"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>
            {loading ? '...' : 'Buscar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* FILTROS */}
      <View style={styles.viewSelect}>

        {/* SELECT MARCA */}
        <RNPickerSelect
          onValueChange={setBrandId}
          value={brandId}
          placeholder={{ label: 'Marcas', value: null }}
          items={brands.map(brand => ({
            label: brand.name,
            value: brand.id,
          }))}
          style={{
            inputIOS: styles.select,
            inputAndroid: styles.select,
          }}
        />

        {/* SELECT LINHA */}
        <RNPickerSelect
          onValueChange={setLineId}
          value={lineId}
          placeholder={{ label: 'Linhas', value: null }}
          items={lines.map(line => ({
            label: line.name,
            value: line.id,
          }))}
          style={{
            inputIOS: styles.select,
            inputAndroid: styles.select,
          }}
        />

      </View>
    </View>
  );
}
