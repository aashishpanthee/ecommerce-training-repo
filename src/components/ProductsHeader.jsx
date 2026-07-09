import ProductSearch from './ProductSearch.jsx';

const ProductsHeader = ({ filteredCount, totalCount, searchTerm, setSearchTerm }) => {
  return (
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
          {filteredCount} of {totalCount} items shown
        </div>
      </div>

      <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default ProductsHeader;
