import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaMobileAlt, FaBirthdayCake, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [number, setNumber] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('Male')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = { name, email, password, number, dob, gender }
    const result = await dispatch(registerUser(newUser))
    if (!result.error) navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-sky-700 mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-sky-300"
              required
            />
          </div>

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

          <div className="relative">
            <FaMobileAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Mobile Number"
              value={number}
              onChange={e => setNumber(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div className="relative">
            <FaBirthdayCake className="absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div className="flex items-center gap-4">
            {['Male', 'Female', 'Other'].map(g => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={e => setGender(e.target.value)}
                  className="accent-sky-500"
                />
                {g}
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition mt-2 disabled:opacity-70"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-600 font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
