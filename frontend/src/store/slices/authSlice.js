import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setLoginState as setCartLogin } from './cartSlice'
import { setLoginState as setWishlistLogin } from './wishlistSlice'

// ✅ Auto-detect environment (local or deployed)
const API_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000/api'
    : 'https://jps-shop-backend.vercel.app/api'

// ✅ Load saved session
const savedUser = JSON.parse(sessionStorage.getItem('user'))
const savedToken = sessionStorage.getItem('token')

// 🔹 Helper for safe JSON parsing
async function safeJsonParse(res) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Server returned invalid response')
  }
}

// 🔹 Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch("${API_URL}/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      const data = await safeJsonParse(res)
      if (!res.ok) throw new Error(data.message || 'Registration failed')
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// 🔹 Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch("${API_URL}/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      const data = await safeJsonParse(res)
      if (!res.ok) throw new Error(data.message || 'Login failed')

      // ✅ Merge local + server user
      const localUser = JSON.parse(sessionStorage.getItem('user'))
      const mergedUser = localUser ? { ...data.user, ...localUser } : data.user

      // ✅ Store user & token
      sessionStorage.setItem('user', JSON.stringify(mergedUser))
      sessionStorage.setItem('token', data.token)

      dispatch(setCartLogin(true))
      dispatch(setWishlistLogin(true))

      return { ...data, user: mergedUser }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser || null,
    token: savedToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      state.user = null
      state.token = null
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')

      if (action?.dispatch) {
        action.dispatch(setCartLogin(false))
        action.dispatch(setWishlistLogin(false))
      }
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        sessionStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    updateProfilePic: (state, action) => {
      if (state.user) {
        const profilePath = action.payload
        state.user.profilePic = profilePath
        state.user.profileImage = profilePath
        sessionStorage.setItem('user', JSON.stringify(state.user))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// 🔹 Logout helper
export const logoutUser = () => (dispatch) => {
  dispatch(authSlice.actions.logout({ dispatch }))
  dispatch(setCartLogin(false))
  dispatch(setWishlistLogin(false))
}

export const { logout, updateUser, updateProfilePic } = authSlice.actions
export default authSlice.reducer