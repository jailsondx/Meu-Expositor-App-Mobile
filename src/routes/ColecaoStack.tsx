import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colecao from '../screens/Colecao/Colecao';
import itensColecao from '../screens/Colecao/itensColecao';

const Stack = createNativeStackNavigator();

export default function ColecaoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Colecao"
        component={Colecao}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ItensColecao"
        component={itensColecao}
        options={{ title: 'Itens da Coleção' }}
      />
    </Stack.Navigator>
  );
}
