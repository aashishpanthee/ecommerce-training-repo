import { useEffect, useState } from 'react';
import axiosInstance from '../axios/index.js';
import PageMessage from './PageMessage.jsx';
import ProductsGrid from './ProductsGrid.jsx';

export default function ProductGrids() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <PageMessage message="Loading products..." backgroundClassName="bg-white" />;
  }

  if (error) {
    return <PageMessage message={`Error: ${error}`} tone="error" backgroundClassName="bg-white" />;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>

        <ProductsGrid
          products={products.slice(0, 12)}
          className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          emptyMessage="No products available right now."
        />
      </div>
    </div>
  );
}
