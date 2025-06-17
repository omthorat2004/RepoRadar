import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token:localStorage.getItem('token'),
        user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
        loading:false,
        success:false,
        error:false,
        message:'',
    },
    reducers:{
        setInitialState:(state,action)=>{
            state.success = false
            state.error = false
            state.loading = false
            state.message = false
        }
    },
    extraReducers:(builder)=>{

    }  
})

export default authSlice.reducer

