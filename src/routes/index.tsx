import { useAuth } from '../contexts/AuthContext';
import AuthRoutes from './AuthRoutes';
import RootRoutes from './RoutesStack';

export default function Routes() {
  const { signed } = useAuth();
  return signed ? <RootRoutes /> : <AuthRoutes />;
}
