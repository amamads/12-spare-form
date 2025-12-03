import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isMobilePhone } from "validator";
import { useAppDispatch } from "@/app/hooks";
import { getDefaultValue, setStep, setStep1Values } from "./formSlice";


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

export const Step1 = () => {
    const dispatch = useAppDispatch();

    const defaultValues = getDefaultValue(['name', 'phoneNumber'])

    const form = useForm<FormFieldesStep1>({
        resolver: zodResolver(schema),
        defaultValues
        // defaultValues: {
        //     name: name ?? undefined,
        //     phoneNumber: phoneNumber ?? undefined
        // }
    })
    const { control, formState: { errors, isSubmitting } } = form

    // function fromOnSubmit(data: SubmitHandler<FormFieldesStep1>) {
    function fromOnSubmit(data: FormFieldesStep1) {
        dispatch(setStep1Values({ name: data.name, phoneNumber: data.phoneNumber }))

        dispatch(setStep(2))
    }

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