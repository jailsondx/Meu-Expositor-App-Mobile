import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';

import Figures_Collection from '../../components/FlatListItems/FlatList_ItemsMin';
import GlobalStyles from '../../GlobalStyles';
import styles from './styles';

type RouteParams = {
  ItensColecao: {
    collectionId: number;
    collectionName: string;
  };
};

export default function ItensColecao() {
  const route = useRoute<RouteProp<RouteParams, 'ItensColecao'>>();
  const { collectionId, collectionName } = route.params;

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={styles.title}>{collectionName || '?Coleção Indefinida?'}</Text>
      </View>

      <Figures_Collection
        url="/get/getCollectionById"
        collectionId={collectionId}
      />
    </SafeAreaView>
  );
}
