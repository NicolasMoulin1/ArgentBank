import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./authActions";

// Récupérer le token depuis localStorage s'il existe
const tokenFromStorage = localStorage.getItem("token") || null;
const profileFromStorage= localStorage.getItem('profile')
  ? JSON.parse(localStorage.getItem('profile'))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!tokenFromStorage, // Si le token existe, on est authentifié
    token: tokenFromStorage,
    profile: profileFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token; // Assigner le token
      state.loading = false;
      localStorage.setItem("token", action.payload.token); // Sauvegarder le token
    },
    infoUser: (state, action) => {
      state.profile = action.payload.profile;
      localStorage.setItem('profile', JSON.stringify(action.payload.profile));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.profile = null;
      localStorage.removeItem("token"); // Supprimer le token du localStorage
      localStorage.removeItem("profile");
    },
  },
});

export const { loginStart, loginSuccess, infoUser, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
