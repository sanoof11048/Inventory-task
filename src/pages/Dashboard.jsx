import { useEffect, useState } from 'react';
import {
    Package,
    Plus,
    Search,
    Filter,
    Star,
    Edit,
    Eye,
    Trash2,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    BarChart3,
    Users,
    ShoppingCart,
    Activity,
    Settings,
    Home,
    Archive,
    Menu,
    X
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const { data, isLoading, isError, error } = useProducts();

    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const products = data?.data || [];

    const navigate = useNavigate()

    const stats = {
        totalProducts: products.length,
        activeProducts: products.filter(p => p.active).length,
        totalStock: products.reduce((sum, p) => sum + p.totalStock, 0),
        lowStockItems: products.filter(p => p.totalStock < 10).length,
        favoriteProducts: products.filter(p => p.isFavourite).length
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.productCode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' ||
            (filterStatus === 'active' && product.active) ||
            (filterStatus === 'inactive' && !product.active) ||
            (filterStatus === 'low-stock' && product.totalStock < 10) ||
            (filterStatus === 'favorites' && product.isFavourite);
        return matchesSearch && matchesFilter;
    });

    const getStockStatus = (stock) => {
        if (stock === 0) return { color: 'text-red-600 bg-red-50', label: 'Out of Stock' };
        if (stock < 10) return { color: 'text-yellow-600 bg-yellow-50', label: 'Low Stock' };
        return { color: 'text-green-600 bg-green-50', label: 'In Stock' };
    };

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'products', label: 'Products', icon: Package }
    ];

    const DashboardContent = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Products</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                        </div>
                        <Package className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Active Products</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                        </div>
                        <Activity className="w-8 h-8 text-green-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Stock</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalStock}</p>
                        </div>
                        <Archive className="w-8 h-8 text-purple-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Low Stock Items</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.lowStockItems}</p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Favorites</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.favoriteProducts}</p>
                        </div>
                        <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {products.slice(0, 4).map(product => (
                            <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-medium text-gray-900">{product.productName}</h3>
                                    {product.isFavourite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{product.productCode}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(product.totalStock).color}`}>
                                        {getStockStatus(product.totalStock).label}
                                    </span>
                                    <span className="text-sm text-gray-600">Stock: {product.totalStock}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const ProductsContent = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Products</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="low-stock">Low Stock</option>
                            <option value="favorites">Favorites</option>
                        </select>
                        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold text-gray-900">{product.productName}</h3>
                                <div className="flex items-center gap-1">
                                    {product.isFavourite && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                                    <span className={`w-3 h-3 rounded-full ${product.active ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Code:</span> {product.productCode}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">HSN:</span> {product.hsnCode}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        <span className="font-medium">Stock:</span> {product.totalStock}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatus(product.totalStock).color}`}>
                                        {getStockStatus(product.totalStock).label}
                                    </span>
                                </div>
                            </div>

                            {/* Variants */}
                            {product.variants.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Variants:</p>
                                    <div className="space-y-1">
                                        {product.variants.map((variant, index) => (
                                            <div key={index} className="text-xs text-gray-600">
                                                <span className="font-medium">{variant.variantName}:</span> {variant.options.map(opt => `${opt.value} (${opt.stock})`).join(', ')}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <button
                                onClick={()=>navigate(`/products/details/${product.id}`)}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                                    <Eye className="w-4 h-4" />
                                    View
                                </button>
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm">
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );

    return (
         <div className="min-h-screen bg-gray-50 flex w-full">
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:static`}>
                <div className="flex items-center justify-between p-4 ">
                    <div className="flex items-center gap-2">
                        <Package className="w-8 h-8 text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900">StockFlow</h1>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {sidebarItems.map(({ id, label, icon: Icon }) => (
                            <li key={id}>
                                <button
                                    onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="w-full">
                <header className="bg-white shadow-sm w-full">
                    <div className="flex justify-between items-center px-4 py-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded hover:bg-gray-100">
                            <Menu className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-600">Welcome back, <span className="font-medium">Admin</span></span>
                    </div>
                </header>

                <main className="p-6">
                    {activeTab === 'dashboard' && <DashboardContent products={products} stats={stats} getStockStatus={getStockStatus} />}
                    {activeTab === 'products' && <ProductsContent filteredProducts={filteredProducts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterStatus={filterStatus} setFilterStatus={setFilterStatus} getStockStatus={getStockStatus} />}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;