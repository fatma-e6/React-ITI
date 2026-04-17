import { createBrowserRouter } from 'react-router';
import MainLayout from './components/MainLayout';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import UsersList from './components/UsersList';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <ProductsList /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'users', element: <UsersList /> },
      { path: 'cart', element: <Cart /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);