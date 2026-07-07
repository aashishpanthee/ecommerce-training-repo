import { useEffect, useState } from 'react';
import axiosInstance from '../axios/index.js';

const CreateProductPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('https://placehold.co/600x400');
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await axiosInstance.get('/categories');
        setCategories(response.data);
        setCategoryId(String(response.data?.[0]?.id || ''));
      } catch (fetchError) {
        setError(fetchError.message || 'Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setCategoryId(String(categories?.[0]?.id || ''));
    setImageUrl('https://placehold.co/600x400');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage('');

    try {
      const payload = {
        title: title.trim(),
        price: Number(price),
        description: description.trim(),
        categoryId: Number(categoryId),
        images: [imageUrl.trim()],
      };

      const response = await axiosInstance.post('/products/', payload);
      setSuccessMessage(`Product created successfully with id ${response.data?.id ?? 'new'}.`);
      resetForm();
    } catch (submitError) {
      setError(submitError.response?.data?.message || submitError.message || 'Failed to create product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white/85 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="h-2 bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-500" />

        <div className="p-6 sm:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">Inventory</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Create a new product</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Fill in the product details below and send them directly to the Escuela API.
            </p>
          </div>

          {(error || successMessage) && (
            <div className="mt-6 space-y-3">
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {successMessage}
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Title</span>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="New Product"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  required
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Price</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="10"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  required
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Description</span>
              <textarea
                rows="5"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="A description"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                required
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Category</span>
                <select
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  required
                  disabled={loadingCategories}
                >
                  {loadingCategories ? (
                    <option>Loading categories...</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">Image URL</span>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  placeholder="https://placehold.co/600x400"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                  required
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                The API expects <span className="font-medium text-slate-700">images</span> as an array, so the URL above
                is submitted as one image.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Creating...' : 'Create Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
