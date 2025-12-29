import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../screens/Welcome/Welcome';
import Login from '../screens/Login e Registro/Login';
import Register from '../screens/Login e Registro/Register';

const Stack = createNativeStackNavigator();

export default function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
