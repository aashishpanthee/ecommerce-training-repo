import { useEffect, useState } from 'react';
import axiosInstance from '../axios/index.js';
import ProductCard from '../components/ProductCard.jsx';
import ProductSearch from '../components/ProductSearch.jsx';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  if (loading) {
    return (
      <div className="bg-linear-to-b from-slate-50 via-white to-slate-100">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <p className="text-center text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-linear-to-b from-slate-50 via-white to-slate-100">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#413C65]" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Catalog</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Products</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Find exactly what you want by searching product titles below.
              </p>
            </div>

            <div className="text-sm font-medium text-slate-500">
              {filteredProducts.length} of {products.slice(0, 12).length} items shown
            </div>
          </div>

          <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-600 shadow-sm">
              No products match “{searchTerm.trim()}”.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
