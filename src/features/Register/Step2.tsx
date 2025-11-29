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
import { Card, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";


const schema = z.object({
  email: z
    .string('ایمیل را وارد کنید')
    .email({ message: 'ایمیل معتبر نمیباشد' })
    .nullable()
})
export type FormFieldesStep2 = z.infer<typeof schema>;
// export type FormFieldesStep2 = { name: string };

export const Step2 = () => {
  const dispatch = useAppDispatch();

  const step = useAppSelector(selectStep)
  const name = useAppSelector(selectName)
  const phoneNumber = useAppSelector(selectPhoneNumber)

  const form = useForm<FormFieldesStep2>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'demo@text.as'
    }
  })
  const { control, formState: { errors, isSubmitting } } = form

  // function fromOnSubmit(data: SubmitHandler<FormFieldesStep2>) {
  function fromOnSubmit(data: FormFieldesStep2) {
    if (step === 2) {
      console.log('object');

      dispatch(setStep(3))
    }
  }
  // console.log(step);
  return (

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(fromOnSubmit)}
        className="space-y-8 grid"
      >
        <h1 className="text-center text-4xl">مرحله دوم</h1>
        <Card>
          <CardContent className='flex justify-around'>
            <p>نام: {name}</p>
            <p>شماره همراه: {phoneNumber}</p>
          </CardContent>
        </Card>

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="ایمیل را وارد کنید" />
              </FormControl>
              {errors.email && <FormDescription>{errors.email?.message}</FormDescription>}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>ایمیل</FormLabel>
              <FormControl>
                {/* <Input {...field} value={field.value ?? ''} placeholder="ایمیل را وارد کنید" /> */}
                <Select>
                  
                </Select>
              </FormControl>
              {errors.email && <FormDescription>{errors.email?.message}</FormDescription>}
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <Button
            onClick={() => dispatch(setStep(1))}
            className="text-lg flex-1">
            مرحله قبل
          </Button>
          <Button type="submit" className="text-lg flex-1">
            {isSubmitting ? 'درحال ثبت ...' : "مرحله بعد"}
          </Button>
        </div>
      </form>
    </Form >
  );
};

// import { useAppDispatch, useAppSelector } from '@/app/hooks';
// import { Button } from '@/components/ui/button'
// import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { selectName, selectPhoneNumber, setStep } from './formSlice';
// import { Card, CardContent } from '@/components/ui/card';

// export default function Step2({ form: { control, formState: { errors, isSubmitting } } }: { form: any }) {
//   const dispatch = useAppDispatch();

//   const name = useAppSelector(selectName)
//   const phoneNumber = useAppSelector(selectPhoneNumber)

//   return (
//     <>
//       <h1 className="text-center text-4xl">مرحله دوم</h1>
//       <Card>
//         <CardContent className='flex justify-around'>
//           <p>نام: {name}</p>
//           <p>شماره همراه: {phoneNumber}</p>
//         </CardContent>
//       </Card>

//       <FormField
//         control={control}
//         name="email"
//         render={({ field }) => (
//           <FormItem className="w-full">
//             <FormLabel>ایمیل</FormLabel>
//             <FormControl>
//               <Input {...field} placeholder="ایمیل را وارد کنید" />
//             </FormControl>
//             {errors.email && <FormDescription>{errors.email?.message}</FormDescription>}
//           </FormItem>
//         )}
//       />

//       <div className='flex gap-2'>
//         <Button
//           onClick={() => dispatch(setStep(1))}
//           className="text-lg flex-1">
//           مرحله قبل
//         </Button>
//         <Button type="submit" className="text-lg flex-1">
//           {isSubmitting ? 'درحال ثبت ...' : "مرحله بعد"}
//         </Button>
//       </div>

//     </>
//   )
// }
