import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isMobilePhone } from "validator";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectName, selectPhoneNumber, selectStep, setName, setPhoneNumber, setStep } from "./formSlice";


const schema = z.object({
    name: z
        .string({ message: 'نام باید از حروف باشد' })
        .min(2, { message: 'نام را وارد کنید' }).nullable(),
    phoneNumber: z
        .string({ message: 'شماره همراه خود را وارد کنید' })
        .refine(
            (val) => isMobilePhone(val, "fa-IR"),
            { message: "شماره موبال معتبر نمیباشد" }
        ).nullable()
})
export type FormFieldesStep1 = z.infer<typeof schema>;
// export type FormFieldesStep1 = { name: string };

export const Step1 = () => {
    const dispatch = useAppDispatch();

    const step = useAppSelector(selectStep)
    const name = useAppSelector(selectName)
    const phoneNumber = useAppSelector(selectPhoneNumber)

    const form = useForm<FormFieldesStep1>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: 'امیرمحمد صادقی',
            phoneNumber: '09204670120',
        }
    })
    const { control, formState: { errors, isSubmitting } } = form

    useEffect(() => {
        dispatch(setName('امیرمحمد صادقی'))
        dispatch(setPhoneNumber('09204670120'))
    }, [])

    // function fromOnSubmit(data: SubmitHandler<FormFieldesStep1>) {
    function fromOnSubmit(data: FormFieldesStep1) {
        dispatch(setName(data.name))
        dispatch(setPhoneNumber(data.phoneNumber))
        dispatch(setStep(2))
    }
    // console.log(step);
    return (

        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(fromOnSubmit)}
                className="space-y-8 grid"
            >
                <h1 className="text-center text-4xl">مرحله اول</h1>
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>نام</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ''} placeholder="نام را ورد کنید" />
                            </FormControl>
                            {errors.name && <FormDescription>{errors.name?.message}</FormDescription>}
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>شماره همراه</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value ?? ''} placeholder="شماره همراه را وارد کنید" />
                            </FormControl>
                            {errors.phoneNumber && <FormDescription>{errors.phoneNumber?.message}</FormDescription>}
                        </FormItem>
                    )}
                />

                <Button type="submit" className="text-lg">
                    {isSubmitting ? 'درحال ثبت ...' : "مرحله بعد"}
                </Button>
            </form>
        </Form>
    );
};


// import { Button } from '@/components/ui/button'
// import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'

// export default function Step1({ form: { control, formState: { errors, isSubmitting } } }: { form: any }) {
//     return (
//         <>
//             <h1 className="text-center text-4xl">مرحله اول</h1>

//             <FormField
//                 control={control}
//                 name="name"
//                 render={({ field }) => (
//                     <FormItem className="w-full">
//                         <FormLabel>نام</FormLabel>
//                         <FormControl>
//                             <Input {...field} placeholder="نام را ورد کنید" />
//                         </FormControl>
//                         {errors.name && <FormDescription>{errors.name?.message}</FormDescription>}
//                     </FormItem>
//                 )}
//             />

//             <FormField
//                 control={control}
//                 name="phoneNumber"
//                 render={({ field }) => (
//                     <FormItem className="w-full">
//                         <FormLabel>شماره همراه</FormLabel>
//                         <FormControl>
//                             <Input {...field} placeholder="شماره همراه را وارد کنید" />
//                         </FormControl>
//                         {errors.phoneNumber && <FormDescription>{errors.phoneNumber?.message}</FormDescription>}
//                     </FormItem>
//                 )}
//             />

//             <Button type="submit" className="text-lg">
//                 {isSubmitting ? 'درحال ثبت ...' : "مرحله بعد"}
//             </Button>
//         </>
//     )
// }
