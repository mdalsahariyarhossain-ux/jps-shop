import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categoryProducts } from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import { FaHeart } from "react-icons/fa";

export default function SearchResults() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: wishlist } = useSelector((state) => state.wishlist);

  // ✅ Get query string (?query=...)
  const query = new URLSearchParams(search).get("query") || "";
  const searchTerm = decodeURIComponent(query).toLowerCase();

  const allProducts = Object.values(categoryProducts).flat();

  const filteredProducts = allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm)
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = (e, product) => {
    e.stopPropagation();
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-10 py-10">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Search Results for “{decodeURIComponent(query)}”
      </h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No products found for your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden group relative"
              >
                <button
                  onClick={(e) => handleWishlistToggle(e, product)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-sky-100 transition"
                >
                  <FaHeart
                    size={16}
                    className={isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-400"}
                  />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />

                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-800 mb-3">₹{product.price}</p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => navigate("/checkout", { state: { product } })}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
