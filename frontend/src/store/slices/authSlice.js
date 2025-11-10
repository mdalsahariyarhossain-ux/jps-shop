import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api' // import your axios instance
import { setLoginState as setCartLogin } from './cartSlice'
import { setLoginState as setWishlistLogin } from './wishlistSlice'

// ✅ Load session
const savedUser = JSON.parse(sessionStorage.getItem('user'))
const savedToken = sessionStorage.getItem('token')

// 🔹 Register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/register', userData)
      return data
    } catch (err) {
      // Axios error handling
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// 🔹 Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', credentials)

      // Merge session user with server user if exists
      const localUser = JSON.parse(sessionStorage.getItem('user'))
      const mergedUser = localUser ? { ...data.user, ...localUser } : data.user

      // Store user and token in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(mergedUser))
      sessionStorage.setItem('token', data.token)

      dispatch(setCartLogin(true))
      dispatch(setWishlistLogin(true))

      return { ...data, user: mergedUser }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
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
