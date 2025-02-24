import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-yellow-400">
        🔥 Featured Products 🔥
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl hover:scale-105 transition transform duration-300"
          >
            <div className="relative">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                ${product.price}
              </span>
            </div>
            <h2 className="text-xl font-semibold mt-4 text-white">
              {product.title}
            </h2>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {product.description}
            </p>
            <button className="mt-4 w-full bg-yellow-500 text-black py-2 rounded-md font-semibold hover:bg-yellow-400 transition duration-300">
              Buy Now 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
