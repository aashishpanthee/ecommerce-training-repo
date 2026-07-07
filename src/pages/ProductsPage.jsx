import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/index.js';

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

          <label
            htmlFor="product-search"
            className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm transition focus-within:border-[#413C65] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#413C65]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 text-slate-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.3-4.3m1.8-5.2a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              />
            </svg>
            <input
              id="product-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products by title"
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group relative block">
                <img
                  alt={product.title}
                  src={product.images?.[0] || 'https://via.placeholder.com/300'}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </Link>
            ))
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
