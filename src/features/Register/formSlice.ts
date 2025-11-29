import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import type { FormFieldesStep1 } from "./Step1";
import type { FormFieldesStep2 } from "./Step2";
type Step = { step: number }
type FormType = Step & FormFieldesStep1 & FormFieldesStep2

const initialState: FormType = {
    name: null,
    phoneNumber: null,
    email: null,
    step: 2,
};

const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        setName(state, action) {
            state.name = action.payload
        },
        setPhoneNumber(state, action) {
            state.phoneNumber = action.payload
        },
        setStep(state, action) {
            // console.log(state.step);
            state.step = action.payload
            // console.log(state.step);
        },
    },
});

export const {
    setName,
    setPhoneNumber,
    setStep
} = formSlice.actions;

export const selectName = (state: RootState) => state.form.name
export const selectPhoneNumber = (state: RootState) => state.form.phoneNumber
export const selectStep = (state: RootState) => state.form.step

export default formSlice.reducer