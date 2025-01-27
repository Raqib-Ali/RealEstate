import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: state => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false,
        state.error = null
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateStart: (state, action) => {
      state.loading = true;
    },
    deletesuccess: (state, action) => {
      state.loading = false,
        state.error = null,
        state.currentUser = null
    },
    deleteStart: (state, action) => {
      state.loading = true;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutSuccess: (state, action) => {
        state.loading = false,
        state.error = null,
        state.currentUser = null
    },
    signOutStart: (state, action) => {
      state.loading = true;
    },
    signOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
});

// Action creators are generated for each case reducer function
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deletesuccess,
  deleteFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} = userSlice.actions;

export default userSlice.reducer;