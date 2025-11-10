import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setLoginState as setCartLogin } from './cartSlice'
import { setLoginState as setWishlistLogin } from './wishlistSlice'

const API_URL = process.env.REACT_APP_API_URL || 'https://jps-shop-80ex.onrender.com';

// ✅ Load session
const savedUser = JSON.parse(sessionStorage.getItem('user'))
const savedToken = sessionStorage.getItem('token')

// 🔹 Register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const text = await res.text();
let data;

try {
  data = JSON.parse(text);
} catch (e) {
  throw new Error('Server returned non-JSON response. Check backend route or URL.');
}

      if (!res.ok) throw new Error(data.message || 'Registration failed')
      return data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// 🔹 Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const text = await res.text();
let data;

try {
  data = JSON.parse(text);
} catch (e) {
  throw new Error('Server returned non-JSON response. Check backend route or URL.');
}

      if (!res.ok) throw new Error(data.message || 'Login failed')

      // ✅ Merge session user with server user if exists
      const localUser = JSON.parse(sessionStorage.getItem('user'))
      const mergedUser = localUser ? { ...data.user, ...localUser } : data.user

      // ✅ Store user and token in sessionStorage
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

    // ✅ Store correct image path after upload
    updateProfilePic: (state, action) => {
      if (state.user) {
        // backend sends `/uploads/profiles/filename.jpg`
        const profilePath = action.payload
        state.user.profilePic = profilePath
        state.user.profileImage = profilePath // keep both consistent

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
