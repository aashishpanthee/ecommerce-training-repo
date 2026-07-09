import { useEffect, useState } from 'react';
import axiosInstance from '../axios/index.js';
import PageMessage from '../components/PageMessage.jsx';
import ProductsGrid from '../components/ProductsGrid.jsx';
import ProductsHeader from '../components/ProductsHeader.jsx';

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
    return <PageMessage message="Loading products..." />;
  }

  if (error) {
    return <PageMessage message={`Error: ${error}`} tone="error" />;
  }

  return (
    <div className="bg-linear-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <ProductsHeader
          filteredCount={filteredProducts.length}
          totalCount={products.slice(0, 12).length}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ProductsGrid products={filteredProducts} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default ProductsPage;
