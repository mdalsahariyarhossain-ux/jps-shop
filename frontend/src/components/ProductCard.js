import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice'
import { FaHeart, FaShoppingCart, FaStar, FaCreditCard } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wishlist = useSelector((state) => state.wishlist.items)
  const { token } = useSelector((state) => state.auth) // 👈 check login
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Check if product is already in wishlist
  useEffect(() => {
    const exist = wishlist.find((item) => item.id === product.id)
    setIsWishlisted(!!exist)
  }, [wishlist, product.id])

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (!token) {
      navigate('/login')
      return
    }
    dispatch(addToCart(product))
  }

  const handleCheckout = (e) => {
    e.stopPropagation()
    if (!token) {
      navigate('/login')
      return
    }
    dispatch(addToCart(product))
    navigate('/checkout', { state: { product } })
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    if (!token) {
      navigate('/login')
      return
    }
    if (isWishlisted) dispatch(removeFromWishlist(product.id))
    else dispatch(addToWishlist(product))
  }

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 cursor-pointer flex flex-col"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
        {product.isNew && (
          <span className="absolute top-2 left-3 bg-sky-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="absolute top-2 right-3 bg-red-400 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
            Sale
          </span>
        )}

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-sky-100 transition flex items-center justify-center"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <FaHeart
            size={16}
            className={`transition ${
              isWishlisted ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
            }`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col px-2 py-2 flex-1">
        <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-2 hover:text-sky-600 transition">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center text-yellow-400 text-xs mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-gray-500 ml-1 text-xs">
            ({product.reviews || 200})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4 mt-auto">
          <span className="text-m font-semibold text-gray-700">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="bg-sky-500 text-white flex-1 px-2 py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition flex items-center justify-center gap-1"
          >
            <FaShoppingCart /> Add to Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white flex-1 px-2 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition flex items-center justify-center gap-1"
          >
            <FaCreditCard /> Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
