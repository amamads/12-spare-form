import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import type { FormFieldesStep1 } from "./Step1";
import type { FormFieldesStep2 } from "./Step2";
import { nativeEnum } from "zod/v3";
import type { FormFieldesStep3 } from "./Step3";
import { useAppSelector } from "@/app/hooks";
type Step = { step: number }
type FormType = Step & FormFieldesStep1 & FormFieldesStep2 & FormFieldesStep3



// const initialState: FormType = {
//     name: "امیرمحمد صادقی",
//     phoneNumber: "09204670120",
//     email: "demo@text.as",
//     nationalCode: '0060647531',
//     address: "خ مطهری ک ۱۰ متری دوم ک سحر",
//     province: {
//         id: 119,
//         name: "زنجان",
//         slug: "زنجان",
//         tel_prefix: "024"
//     },
//     countie: {
//         id: 1190001,
//         name: "ابهر",
//         slug: "ابهر",
//         province_id: 119
//     },
//     avatar: {},
//     step: 4
// }
const initialState: FormType = {
    name: null,
    phoneNumber: null,
    email: null,
    nationalCode: null,
    address: null,
    province: null,
    countie: null,
    avatar: null,
    step: 1,
};


const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        setStep1Values(state, action: PayloadAction<{
            name: FormFieldesStep1['name'],
            phoneNumber: FormFieldesStep1['phoneNumber']
        }>) {
            const { name, phoneNumber } = action.payload;
            state.name = name;
            state.phoneNumber = phoneNumber
        },
        setStep2Values(state, action: PayloadAction<{
            email: FormFieldesStep2['email'],
            nationalCode: FormFieldesStep2['nationalCode']
            address?: FormFieldesStep2['address'],
            province: FormFieldesStep2['province'],
            countie: FormFieldesStep2['countie'],
        }>) {
            const { email, address, province, countie, nationalCode } = action.payload;
            state.email = email;
            state.address = address;
            state.province = province;
            state.countie = countie;
            state.nationalCode = nationalCode;
        },
        setStep3Values(state, action: PayloadAction<{
            avatar: FormFieldesStep3['avatar'],
        }>) {
            const { avatar } = action.payload;
            state.avatar = avatar;
        },
        setName(state, action) {
            state.name = action.payload
        },
        setPhoneNumber(state, action) {
            state.phoneNumber = action.payload
        },
        setProvince(state, action) {
            state.province = action.payload
        },
        setEmail(state, action) {
            state.email = action.payload
        },
        setCountie(state, action) {
            state.countie = action.payload
        },
        setStep(state, action) {
            state.step = action.payload
        },

    },
});

export const {
    setStep1Values,
    setStep2Values,
    setStep3Values,
    setName,
    setPhoneNumber,
    setEmail,
    setProvince,
    setCountie,
    setStep
} = formSlice.actions;

export const selectName = (state: RootState) => state.form.name;
export const selectPhoneNumber = (state: RootState) => state.form.phoneNumber;
export const selectEmail = (state: RootState) => state.form.email;
export const selectNationalCode = (state: RootState) => state.form.nationalCode;
export const selectAddress = (state: RootState) => state.form.address;
export const selectProvince = (state: RootState) => state.form.province;
export const selectCountie = (state: RootState) => state.form.countie;
export const selectAvatar = (state: RootState) => state.form.avatar;
export const selectStep = (state: RootState) => state.form.step;
export const selectForm = (state: RootState) => state.form;

export function selectFormValues(state: RootState, values: (keyof FormType)[]) {
    const returnedObject: Partial<FormType> = {};
    values.forEach(key => returnedObject[key] = state.form[key]);
    return returnedObject;
}

export function getDefaultValue(values: (keyof FormType)[]) {
    const formValues = useAppSelector(s => selectFormValues(s, values));

    // const returnedObject: Partial<FormType> = {};
    // values.forEach(key => returnedObject[key] = formValues[key]);
    // const values = selectFormValues(values);

    return (Object.keys(formValues) as (keyof FormType)[])
        .reduce((total, key) => {
            total[key] = formValues[key] ?? null;
            return total;
        }, {} as Partial<FormType>);
}


export default formSlice.reducer