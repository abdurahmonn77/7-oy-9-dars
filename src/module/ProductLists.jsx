import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [likedProducts, setLikedProducts] = useState({});
  const [showLikedOnly, setShowLikedOnly] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Toggle Like
  const toggleLike = (id) => {
    setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter products based on liked state
  const displayedProducts = showLikedOnly
    ? products.filter((product) => likedProducts[product.id])
    : products;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-yellow-400">
        🔥 Featured Products 🔥
      </h1>

      {/* Like Counter & Filter Button */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg">
          ❤️ Liked Products:{" "}
          {Object.values(likedProducts).filter(Boolean).length}
        </p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          onClick={() => setShowLikedOnly(!showLikedOnly)}
        >
          {showLikedOnly ? "Show All" : "Show Liked"}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:shadow-lg transition"
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

            <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
            <p className="text-gray-400 text-sm mt-2">{product.description}</p>

            {/* Buttons: Buy & Like */}
            <div className="flex justify-between items-center mt-4">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
                Buy Now 🚀
              </button>
              <button
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  likedProducts[product.id]
                    ? "bg-red-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => toggleLike(product.id)}
              >
                {likedProducts[product.id] ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
