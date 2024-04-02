import {configureStore} from "@reduxjs/toolkit"
import listReducer from "./todo"

const store = configureStore({
    reducer:{
        listReducer:listReducer
    }
})

export default store;