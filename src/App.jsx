import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateProductPage from './components/Products/CreateProductPage';
import ProductPage from './components/Products/ProductsPage';
import EditProductPage from './components/Products/EditProduct';
import ProductDetailsPage from './components/Products/ProductDetailsPage';
import { Toaster } from 'react-hot-toast';
import Login from './Auth/Login';
import Register from './Auth/Register';
import './App.css'
import { authService } from './services/AuthService';

const PrivateRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductPage /></PrivateRoute>} />
        <Route path="/products/create" element={<PrivateRoute><CreateProductPage /></PrivateRoute>} />
        <Route path="/products/edit/:id" element={<PrivateRoute><EditProductPage /></PrivateRoute>} />
        <Route path="/products/details/:id" element={<PrivateRoute><ProductDetailsPage /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster />
    </BrowserRouter>
  );
}

export default App;
