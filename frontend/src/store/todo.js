import { createSlice } from "@reduxjs/toolkit";

const initialState = {list:[]}
const listSlice = createSlice({
    name:'todo',
    initialState:initialState,
    reducers:{
        populateList(state,action){
            state.list = action.payload
        },
    }
})

export const listActions = listSlice.actions
export default listSlice.reducer