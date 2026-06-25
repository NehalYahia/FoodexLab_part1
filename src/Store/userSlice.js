import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    expireAt: null,
    message: null,
    roles: null,
};

const userSlice = createSlice({
    name: "auth",
    initialState ,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.expireAt = action.payload.expireAt;
            state.message = action.payload.message;
            state.roles = action.payload.roles;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.expireAt = null;
            state.message = null;
            state.roles = null;
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;