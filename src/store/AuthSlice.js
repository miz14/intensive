import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: {
            user: null,
            password: null,
            accessToken: null,
        }
    },
    reducers: {
        setAuth(state, action) {
            state.data = action.payload;
        },
        signout(state, action) {
            state.data = {
                user: null,
                password: null,
                accessToken: null,
            }

        }   

    }
})

export const {setAuth, signout} = authSlice.actions;  

export default authSlice.reducer;