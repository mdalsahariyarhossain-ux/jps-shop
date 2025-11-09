import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './store/store'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './components/Login'
import Register from './components/Register'
import Cart from './components/Cart'
import Profile from './pages/Profile'
import Wishlist from './components/Wishlist'
import Checkout from './components/Checkout'
import Category from './pages/Category'
import SavedAddress from './components/SavedAddress'
import { useEffect } from 'react'
import { logout } from './store/slices/authSlice'
import SearchResults from "./pages/SearchResults";
import { loadAddresses } from './store/slices/addressSlice'
import AllProducts from "./pages/AllProducts";
import BecomeSeller from "./pages/BecomeSeller";


// 🔒 ProtectedRoute - stops access without login
function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  return token ? children : <Navigate to="/login" replace />
}

function AppContent() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loadAddresses())
  }, [dispatch])
  
  // ⏳ Auto logout after 5 minutes inactivity
  useEffect(() => {
    let logoutTimer
    const resetTimer = () => {
      clearTimeout(logoutTimer)
      logoutTimer = setTimeout(() => {
        dispatch(logout())
        window.location.href = '/login'
      }, 5 * 60 * 1000)
    }

    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keydown', resetTimer)
    window.addEventListener('click', resetTimer)
    window.addEventListener('scroll', resetTimer)

    resetTimer()

    return () => {
      clearTimeout(logoutTimer)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      window.removeEventListener('click', resetTimer)
      window.removeEventListener('scroll', resetTimer)
    }
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        {/* 🏠 Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login"element={token ? <Navigate to="/" replace /> : <Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/become-seller" element={<BecomeSeller />} />




        {/* 🔒 Protected routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-address"
          element={
            <ProtectedRoute>
              <SavedAddress />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  )
}

export default App
