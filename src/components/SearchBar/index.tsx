import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { api } from '../../services/api';
import styles from './styles';

interface Option {
  id: number;
  name: string;
}

interface SearchBarProps {
  url: string;
  collectionId?: number;
  onResults: (data: any[]) => void;
}

export function SearchBar({ url, collectionId, onResults }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // filtros
  const [brands, setBrands] = useState<Option[]>([]);
  const [lines, setLines] = useState<Option[]>([]);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [lineId, setLineId] = useState<number | null>(null);

  // ===== BUSCA =====
  async function handleSearch() {
    try {
      setLoading(true);

      const response = await api.post(url, {
        search: query,
        collectionId,
        brandId,
        lineId,
      });

      // sucesso (HTTP 200)
      onResults(response.data.data);

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

  useEffect(() => {
    loadFilters();
  }, []);

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
        <Picker
          selectedValue={brandId}
          onValueChange={(value) => setBrandId(value)}
          style={styles.select}
        >
          <Picker.Item label="Marcas" value={null} />
          {brands.map((brand) => (
            <Picker.Item
              key={brand.id}
              label={brand.name}
              value={brand.id}
            />
          ))}
        </Picker>

        {/* SELECT LINHA */}
        <Picker
          selectedValue={lineId}
          onValueChange={(value) => setLineId(value)}
          style={styles.select}
        >
          <Picker.Item label="Linhas" value={null} />
          {lines.map((line) => (
            <Picker.Item
              key={line.id}
              label={line.name}
              value={line.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
