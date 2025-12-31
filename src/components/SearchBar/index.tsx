import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { api } from '../../services/api';
import styles from './styles';

interface SearchBarProps {
  url: string;
  collectionId?: number;
  onResults: (data: any[]) => void;
}

export function SearchBar({ url, collectionId, onResults }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);

      const response = await api.post(url, {
        search: query,
        collectionId,
      });

      onResults(response.data.data);
    } catch (error) {
      console.log('Erro na busca:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
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

    </View>
  );
}
