import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { FaSearch, FaUserCircle, FaHeart, FaShoppingCart ,FaStore } from 'react-icons/fa'

export default function Header() {
  const cart = useSelector((state) => state.cart.items)
  const wishlist = useSelector((state) => state.wishlist.items)
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header
      className="flex justify-between items-center px-10 py-2 shadow-md relative text-white"
      style={{
        background: 'linear-gradient(-45deg, #1e3a8a, #9333ea)',
        backgroundSize: 'cover',
        animation: 'gradientShift 1s ease infinite',
      }}
    >
    {/* Left: Logo */}
    <div className="logo flex items-center gap-2 px-6 cursor-pointer">
      <Link to="/" className="flex items-center hover:opacit   y-90 transition">
        {/* Logo image first */}
        <img
          src="https://dynamic.design.com/preview/logodraft/6a8a5275-019d-4014-8d44-f3be6be16d54/image/large.png"
          alt="My Shop Logo"
          className="h-10 w-10 rounded-full object-cover"
        />
        {/*  Then the shop name */}
        <span className="text-2xl font-extrabold tracking-wide ml-2">
          JPS SHOP
       </span>
      </Link>
    </div>

      {/* Center: Long Search Bar */}
      <div className="flex-1 flex justify-center px-8">
        <div className="relative flex items-center w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full rounded-full border border-gray-300 pl-5 pr-12 py-2 text-m focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <FaSearch
            className="absolute right-4 text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={handleSearch}
            title="Search"
          />
        </div>
      </div>

      {/* Right Section: Wishlist, Cart, Profile , Become a Seller */}
      <div className="flex items-center gap-6 relative">
        {user ? (
          <>
            {/* Cart (rightmost icon) */}
            <Link
              to="/cart"
              className="relative hover:text-gray-200 transition transform hover:scale-110"
              title="Cart"
            >
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {cart.reduce((sum, i) => sum + i.qty, 0)}
                </span>
              )}
            </Link>

             
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative hover:text-pink-300 transition transform hover:scale-110"
              title="Wishlist"
            >
              <FaHeart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Profile */}
            <button
              onClick={() => navigate('/profile')}
              className="relative hover:text-gray-100 transition transform hover:scale-110"
              title="Profile"
            >
              {user.profilePic || user.profileImage ? (
                <img
                  src={
                    user.profilePic?.startsWith('data:')
                      ? user.profilePic
                      : `http://localhost:5000${user.profilePic || user.profileImage}`
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-md"
                />
              ) : (
                <FaUserCircle size={22} />
              )}
            </button>

            {/* Become a Seller (now rightmost button) */}
            <Link
              to="/become-seller"
                className="flex items-center gap-2 border border-white px-6 py-1 rounded-full text-m font-semibold hover:text-blue-600 hover:bg-white transition">
              <FaStore size={16}  />
              <span>Become a Seller</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="font-semibold hover:text-gray-100 transition">
              Login
            </Link>
            <Link to="/register" className="font-semibold hover:text-gray-100 transition">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </header>
  )
}
