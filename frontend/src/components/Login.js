import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (!result.error) navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Login to Your Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-10 py-2 focus:ring-2 focus:ring-sky-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 rounded-xl transition disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          New User?{' '}
          <Link to="/register" className="text-sky-600 font-semibold hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
