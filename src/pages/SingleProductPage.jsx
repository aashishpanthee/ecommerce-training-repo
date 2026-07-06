import { StarIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../axios/index.js';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(price || 0));
}

export default function SingleProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/${productId}`);

        if (!active) {
          return;
        }

        setProduct(response.data);
        setError(null);
      } catch (fetchError) {
        if (!active) {
          return;
        }

        setError(fetchError.message || 'Failed to fetch product');
        setProduct(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      active = false;
    };
  }, [productId]);

  const galleryImages = product?.images?.length ? product.images : product?.thumbnail ? [product.thumbnail] : [];
  const displayImages = galleryImages.slice(0, 4);
  const fallbackImage = 'https://via.placeholder.com/900x900?text=Product+Image';

  if (loading) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8">
            <li className="text-sm">
              <Link to="/products" className="font-medium text-gray-500 hover:text-gray-600">
                Products
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-300">
              /
            </li>
            <li className="text-sm font-medium text-gray-900">{product.title}</li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {displayImages.length > 0 ? (
                displayImages.map((image, index) => (
                  <img
                    key={`${image}-${index}`}
                    alt={product.title}
                    src={image}
                    className="aspect-square w-full rounded-2xl object-cover"
                  />
                ))
              ) : (
                <img
                  alt={product.title}
                  src={fallbackImage}
                  className="aspect-square w-full rounded-2xl object-cover"
                />
              )}
            </div>

            <div className="lg:pl-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
                {product.category?.name || 'Product'}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.title}</h1>
              <p className="mt-4 text-3xl tracking-tight text-gray-900">{formatPrice(product.price)}</p>

              <div className="mt-6 flex items-center gap-2">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(rating < 4 ? 'text-gray-900' : 'text-gray-200', 'size-5 shrink-0')}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">Dynamic product details from API</span>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Description</h2>
                  <p className="mt-3 text-base leading-7 text-gray-600">
                    {product.description || 'No description is available for this product.'}
                  </p>
                </div>

                <div>
                  <h2 className="text-sm font-medium text-gray-900">Category</h2>
                  <p className="mt-3 text-sm text-gray-600">{product.category?.name || 'Uncategorized'}</p>
                </div>

                {product.images?.length ? (
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">Image count</h2>
                    <p className="mt-3 text-sm text-gray-600">{product.images.length} images available</p>
                  </div>
                ) : null}
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Add to bag
                </button>
                <Link
                  to="/products"
                  className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Back to products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
