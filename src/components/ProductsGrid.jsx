import ProductCard from './ProductCard.jsx';

const ProductsGrid = ({ products, searchTerm }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-600 shadow-sm">
          No products match "{searchTerm.trim()}".
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
