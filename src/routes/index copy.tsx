import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Welcome from '../screens/Welcome/Welcome';
import Login from '../screens/Login e Registro/Login';
import Register from '../screens/Login e Registro/Register';
import Home from '../screens/Home/Home';

import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { signed } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {signed ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
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
