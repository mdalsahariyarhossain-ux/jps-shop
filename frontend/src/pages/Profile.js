import { useSelector, useDispatch } from 'react-redux'
import { logout, updateUser } from '../store/slices/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { FaHeart, FaShoppingCart, FaMapMarkerAlt, FaUserEdit, FaLock, FaTrash } from 'react-icons/fa'

export default function Profile() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [editInfo, setEditInfo] = useState(false)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [number, setNumber] = useState(user?.number || '')
  const [dob, setDob] = useState(user?.dob || '')
  const [gender, setGender] = useState(user?.gender || 'Male')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      dispatch(logout())
      navigate('/')
    }
  }

  const handleSaveInfo = () => {
    dispatch(updateUser({ name, email, number, dob, gender }))
    setEditInfo(false)
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-sky-200 to-white">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Please log in to view your profile.</h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
        >
          Go to Login
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-sky-50 flex justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-700 text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-sm text-blue-100">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-6 p-6">

          {/* Sidebar */}
          <div className="space-y-4 border-r pr-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Account Options</h3>

            <Link to="/wishlist" className="flex items-center gap-3 text-gray-700 hover:text-sky-600 transition">
              <FaHeart /> Wishlist
            </Link>

            <Link to="/cart" className="flex items-center gap-3 text-gray-700 hover:text-sky-600 transition">
              <FaShoppingCart /> My Cart
            </Link>

            <Link to="/saved-address" className="flex items-center gap-3 text-gray-700 hover:text-sky-600 transition">
              <FaMapMarkerAlt /> Saved Addresses
            </Link>

            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="flex items-center gap-3 text-gray-700 hover:text-sky-600 transition"
            >
              <FaLock /> Change Password
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-3 text-red-600 hover:text-red-700 transition"
            >
              <FaTrash /> Delete Account
            </button>
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Profile Information</h3>

              {editInfo ? (
                <>
                  <div className="space-y-3">
                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">Full Name</label>
                      <input value={name} onChange={e => setName(e.target.value)} className="border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">Email</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">Mobile Number</label>
                      <input value={number} onChange={e => setNumber(e.target.value)} className="border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">Date of Birth</label>
                      <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="border rounded px-3 py-2" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">Gender</label>
                      <div className="flex gap-4">
                        {['Male', 'Female', 'Other'].map(g => (
                          <label key={g} className="flex items-center gap-2">
                            <input type="radio" name="gender" value={g} checked={gender === g} onChange={e => setGender(e.target.value)} />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button onClick={handleSaveInfo} className="bg-sky-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-sky-600">
                    Save Changes
                  </button>
                </>
              ) : (
                <ul className="text-gray-800 space-y-2">
                  <li><strong>Name:</strong> {name}</li>
                  <li><strong>Email:</strong> {email}</li>
                  <li><strong>Phone:</strong> {number || 'Not provided'}</li>
                  <li><strong>Date of Birth:</strong> {dob || 'Not provided'}</li>
                  <li><strong>Gender:</strong> {gender}</li>
                  <li><strong>Member Since:</strong> 2025</li>
                </ul>
              )}

              <button
                onClick={() => setEditInfo(!editInfo)}
                className="mt-4 flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition"
              >
                <FaUserEdit /> {editInfo ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {showPasswordChange && (
              <div className="p-6 bg-gray-50 rounded-2xl shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Change Password</h3>
                <div className="space-y-3">
                  <input type="password" placeholder="Current Password" className="w-full border px-3 py-2 rounded" />
                  <input type="password" placeholder="New Password" className="w-full border px-3 py-2 rounded" />
                  <input type="password" placeholder="Confirm New Password" className="w-full border px-3 py-2 rounded" />
                  <button className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition">Update Password</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
