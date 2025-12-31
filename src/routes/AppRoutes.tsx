import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home/Home';
import Colecao from '../screens/Colecao/Colecao';
import Figures from '../screens/Figures/Figures';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 100,
        },
        tabBarIcon: ({ color, size, focused }) => {
          //let iconName;
          let iconName: any = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Coleção') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Figures') {
            iconName = focused ? 'man' : 'man-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Coleção" component={Colecao} />
      <Tab.Screen name="Figures" component={Figures} />
    </Tab.Navigator>
  );
}
