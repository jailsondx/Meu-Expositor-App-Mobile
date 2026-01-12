import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import style from './style';
import Home from '../screens/Home/Home';
import Figures from '../screens/Figures/Figures';
import ColecaoStack from './ColecaoStack';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: style.tabBar,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any = 'home';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Coleção') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Figures') {
            iconName = focused ? 'man' : 'man-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E8EBF0',
        tabBarInactiveTintColor: '#6B7280',
      })}
    >
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Coleção" component={ColecaoStack} />
      <Tab.Screen name="Figures" component={Figures} />
    </Tab.Navigator>
  );
}
