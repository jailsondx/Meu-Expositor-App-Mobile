import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../contexts/AuthContext';

import Welcome from '../screens/Welcome/Welcome';
import Login from '../screens/Login e Registro/Login';
import Register from '../screens/Login e Registro/Register';
import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) return null; // depois podemos colocar splash

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // ROTAS PRIVADAS
          <Stack.Screen name="Home" component={Home} />
        ) : (
          // ROTAS PÚBLICAS
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
