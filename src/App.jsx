import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CreateProductPage from './components/Products/CreateProductPage';
import ProductPage from './components/ProductsPage';
import './App.css';
import EditProductPage from './components/Products/EditProduct';
import ProductDetailsPage from './components/Products/ProductDetailsPage';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/create" element={<CreateProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/products/details/:id" element={<ProductDetailsPage/>} />
      </Routes>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
