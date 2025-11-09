import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";
import { FaShoppingCart, FaTrash, FaStar, FaHeart, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const { token } = useSelector((state) => state.auth); // 👈 Check login
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
  };

  const handleRemoveFromWishlist = (id) => {
    if (!token) {
      navigate("/login");
      return;
    }
    dispatch(removeFromWishlist(id));
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076509.png"
          alt="Empty Wishlist"
          className="w-40 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Your wishlist is empty 💔
        </h2>
        <p className="text-gray-500">
          Start exploring and add your favorite products!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-sky-50 to-white">
      <h2 className="text-3xl font-bold text-sky-700 mb-8 text-center drop-shadow-sm">
        ❤️ My Wishlist
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* ❤️ Wishlist Icon */}
            <button
              onClick={() => handleRemoveFromWishlist(product.id)}
              className={`absolute top-3 right-3 p-2 rounded-full shadow transition-transform z-10 ${
                token
                  ? "bg-white hover:scale-110"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
              disabled={!token}
            >
              <FaHeart
                className={`text-lg ${
                  token ? "text-red-500" : "text-gray-400"
                }`}
              />
            </button>

            {/* 🖼 Product Image */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* 🧾 Product Content */}
            <div className="p-5 flex flex-col justify-between min-h-[230px]">
              <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2 hover:text-sky-600 transition">
                {product.name || product.title}
              </h3>

              {/* ⭐ Reviews Section */}
              <div className="flex items-center text-yellow-400 text-sm mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < (product.rating || 4)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-gray-500 ml-1 text-xs">
                  ({product.reviews || 120} reviews)
                </span>
              </div>

              {/* 💰 Price */}
              <div className="mb-4 mt-1">
                <span className="text-xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {/* 🛒 Buttons */}
              <div className="flex justify-between items-center mt-auto gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                    token
                      ? "bg-sky-500 text-white hover:bg-sky-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {token ? (
                    <>
                      <FaShoppingCart /> Add to Cart
                    </>
                  ) : (
                    <>
                      <FaLock /> Login to Add
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  disabled={!token}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                    token
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {token ? (
                    <>
                      <FaTrash /> Remove
                    </>
                  ) : (
                    <>
                      <FaLock /> Login to Remove
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
