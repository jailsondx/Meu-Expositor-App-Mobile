import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppRoutes from './AppRoutes';
import ItensColecao from '../screens/Colecao/itensColecao';

const Stack = createNativeStackNavigator();

export default function RootRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppRoutes} />
      <Stack.Screen name="ItensColecao" component={ItensColecao} />
    </Stack.Navigator>
  );
}
