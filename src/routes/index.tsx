import { useAuth } from '../contexts/AuthContext';
import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';

export default function Routes() {
  const { signed } = useAuth();
  return signed ? <AppRoutes /> : <AuthRoutes />;
}
