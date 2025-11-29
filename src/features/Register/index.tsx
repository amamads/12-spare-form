import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { nullable, number, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import validator, { isMobilePhone } from "validator";
import { useEffect, useState } from "react";
import Step1 from "./Step1";
import NotFindPage from "@/components/NotFindPage";
import Step2 from "./Step2";
import Step3 from "./Step3";
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
    ).nullable(),
  email: z
    .string('ایمیل را وارد کنید')
    .email({ message: 'ایمیل معتبر نمیباشد' })
    .nullable(),


})
export type FormFieldes = z.infer<typeof schema>;
// export type FormFieldes = { name: string };

export const Register = () => {
  const dispatch = useAppDispatch();

  const step = useAppSelector(selectStep)
  const name = useAppSelector(selectName)
  const phoneNumber = useAppSelector(selectPhoneNumber)

  const form = useForm<FormFieldes>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'امیرمحمد صادقی',
      phoneNumber: '09204670120',
      email: 'demo@test.as'
    }
  })

  useEffect(() => {
    dispatch(setName('امیرمحمد صادقی'))
    dispatch(setPhoneNumber('09204670120'))
  }, [])

  // function fromOnSubmit(data: SubmitHandler<FormFieldes>) {
  function fromOnSubmit(data: FormFieldes) {
    if (step === 1) {
      console.log('object');
      dispatch(setName(data.name))
      dispatch(setPhoneNumber(data.phoneNumber))

      dispatch(setStep(2))
    }
  }
  // console.log(step);
  return (
    <Card className="px-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(fromOnSubmit)}
          className="space-y-8 grid"
        >

          {step === 1
            ? <Step1 form={form} />
            : step === 2
              ? <Step2 form={form} />
              : step === 3
                ? <Step3 />
                : <NotFindPage />
          }




          {/* <Button type="submit" className="text-lg">
            {form.formState.isSubmitting ? 'درحال ثبت ...' : "مرحله بعد"}
          </Button> */}
          {/* <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="نام را ورد کنید" />
                </FormControl>
                {form.formState.errors.name && <FormDescription>{form.formState.errors.name?.message}</FormDescription>}
              </FormItem>
            )}
          /> */}
        </form>
      </Form>
    </Card>
  );
};
