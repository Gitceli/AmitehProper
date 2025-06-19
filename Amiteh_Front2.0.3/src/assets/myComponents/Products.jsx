import React from 'react';
import ProductCard from '@/assets/myComponents/ProductCard';
import { Loader2 } from 'lucide-react';
import useFetchProducts from '@/assets/myComponents/hooks/useFetchProducts';

const ProductShowcase = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading products: {error.message}
      </div>
    );
  }

  // Ensure that products.results is an array before using map
  const productArray = products?.results || [];

  return (
    <div className="container mx-auto my-8 px-6 py-8 bg-white rounded-xl ">
    <h2 className="text-3xl font-bold mb-8 text-center">Product Showcase</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
     
      {productArray.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
