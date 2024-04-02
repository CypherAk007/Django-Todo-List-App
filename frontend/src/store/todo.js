import { createSlice } from "@reduxjs/toolkit";

const initialState = {list:[],open:false}
const listSlice = createSlice({
    name:'todo',
    initialState:initialState,
    reducers:{
        populateList(state,action){
            state.list = action.payload
        },
        openModal(state){
            state.open = !state.open
        }
    }
})

export const listActions = listSlice.actions
export default listSlice.reducer