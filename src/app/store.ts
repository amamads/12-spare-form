import { configureStore } from "@reduxjs/toolkit";
import formReducer from '@/features/Register/formSlice'
const store = configureStore({
    reducer: {
        form: formReducer,
    },
})
export default store;
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']