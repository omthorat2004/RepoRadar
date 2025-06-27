import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// === SIGNUP USER ===
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (body, thunkApi) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_API}/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(body)
        }
      )

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
      }

      const data = await response.json()
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

// === LOGIN USER ===
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (body, thunkApi) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_API}/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(body)
        }
      )

      if (!response.ok) {
        const { error } = await response.json()
        throw new Error(error)
      }

      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    loading: false,
    success: false,
    error: false,
    message: ''
  },
  reducers: {
    setInitialState: state => {
      state.success = false
      state.error = false
      state.loading = false
      state.message = ''
    },
    logOutUser: (state, action) => {
      state.token = null
      localStorage.removeItem('token')
      state.user = null
      localStorage.removeItem('user')
    }
  },
  extraReducers: builder => {
    builder
      // SIGNUP
      .addCase(signupUser.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.message = ''
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      // LOGIN
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = false
        state.success = false
        state.message = ''
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.token = action.payload.token
        state.user = action.payload.user

        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })
  }
})

// Selectors
export const selectAuthToken = state => state.auth.token
export const selectAuthUser = state => state.auth.user
export const selectAuthLoading = state => state.auth.loading
export const selectAuthSuccess = state => state.auth.success
export const selectAuthError = state => state.auth.error
export const selectAuthMessage = state => state.auth.message

// actions
export const { setInitialState, logOutUser } = authSlice.actions

export default authSlice.reducer
