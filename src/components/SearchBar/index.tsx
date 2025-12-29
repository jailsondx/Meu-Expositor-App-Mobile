import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { api } from '../../services/api';
import styles from './styles';

interface SearchBarProps {
  url: string;
  onResults: (data: any[]) => void;
}

export function SearchBar({ url, onResults }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);

      const response = await api.get(url, {
        params: { search: query },
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
      <TextInput
        placeholder="Pesquisar..."
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
  );
}
