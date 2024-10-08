// Signup
import { createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

 export const Signup = createAsyncThunk('/user/signup', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:3000/api/register', data);
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});
export const userLogin = createAsyncThunk('/user/login', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:3000/api/login', data);
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});
const initialState = {  
    loading: false,
    error:null,
    token:null,
    name:null,
    role:null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(Signup.pending, (state)=>{
            state.loading = true ;
            state.error = null
         }).addCase(Signup.fulfilled , (state)=>{
            state.loading = false ;
            state.error = null
            toast.success("User registered Successfully");
         }).addCase(Signup.rejected,(state,action)=>{
            state.loading = false ;
            state.error = action.payload;
         }).addCase(userLogin.pending, (state)=>{
            state.loading = true;
            state.error = null;
         }).addCase(userLogin.fulfilled,(state)=>{
            state.loading = false;
            state.error = null;
            toast.success("User Logged in Successfully");
         }).addCase(userLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
         })
    }
});
// Export the action creators
export const reducer = userSlice.reducer;


export default userSlice.reducer;

//async thunk => we can use this middleware to implement all the asynchronous logic in the redux like api calling and then handle the states of the api in the slice like pending , failed , or fulfilled

//NOTE using createAsyncThunk we can implement the api logic which returns a promise and handle the promise states(pending,fulfilled , failed) in userSlice.

//NOTE createAsyncThunk accpets a action type and a function in which we are going to call the api.