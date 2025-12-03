import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getDefaultValue, selectForm, setStep, setStep2Values } from "./formSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import counties from '@/data/counties.json'
import provinces from '@/data/provinces.json'
import { StarHalf } from "lucide-react";

const schema = z.object({
  email: z
    .string('ایمیل را وارد کنید')
    .email('ایمیل معتبر نمیباشد')
    .nullable(),
  address: z.string().optional().nullable(),
  nationalCode: z
    .string('کد ملی خود را وارد کنید')
    .refine(
      value => isValidNationalCode(value),
      { message: 'کد ملی معتبر نمیباشد' }
    ).nullable(),
  province: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    tel_prefix: z.string(),
  }, { message: "استان خود را انتخاب کنید" }).nullable(),
  countie: z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    province_id: z.number()
  }, { message: "شهرستان خود را انتخاب کنید" }).nullable()
})
export type FormFieldesStep2 = z.infer<typeof schema>;

const isValidNationalCode = (code: string) => {
  if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;

  let sum = 0,
    chars = code.split(''),
    lastDigit,
    remainder;

  for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);

  remainder = sum % 11;
  lastDigit = remainder < 2 ? remainder : 11 - remainder;

  return +chars[9] === lastDigit;
};

export const Step2 = () => {
  const dispatch = useAppDispatch();

  const { name, phoneNumber, countie, province } = useAppSelector(selectForm);

  const defaultValues = getDefaultValue(['email', 'nationalCode', 'address', 'province', 'countie'])
  const form = useForm<FormFieldesStep2>({
    resolver: zodResolver(schema),
    defaultValues
    // defaultValues: {
    // email: 'demo@text.as',
    // nationalCode: '0060647531',
    // province: {
    //   "id": 119,
    //   "name": "زنجان",
    //   "slug": "زنجان",
    //   "tel_prefix": "024"
    // },
    // countie: {
    //   "id": 1190001,
    //   "name": "ابهر",
    //   "slug": "ابهر",
    //   "province_id": 119
    // },
    // }
  })
  const { control, formState: { errors, isSubmitting } } = form
  const selectedProvice = form.watch('province');

  // function fromOnSubmit(data: SubmitHandler<FormFieldesStep2>) {
  function fromOnSubmit(data: FormFieldesStep2) {
    dispatch(setStep2Values({
      email: data.email,
      nationalCode: data.nationalCode,
      address: data.address,
      province: data.province,
      countie: data.countie
    }))
    dispatch(setStep(3))
  }

  return (

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(fromOnSubmit)}
        className="space-y-8 grid"
      >
        <h1 className="text-center text-4xl">مرحله دوم</h1>
        <Card>
          <CardContent className='flex justify-around'>
            <p>نام: {name ?? 'وارد نشده'}</p>
            <p>شماره همراه: {phoneNumber ?? 'وارد نشده'}</p>
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
          name="nationalCode"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>کد ملی</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="کد ملی را وارد کنید" />
              </FormControl>
              {errors.nationalCode && <FormDescription>{errors.nationalCode?.message}</FormDescription>}
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex gap-0">
                <StarHalf className="rotate-y-180" />
                <span>آدرس</span>
              </FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} placeholder="آدرس را وارد کنید" />
              </FormControl>
              {errors.address && <FormDescription>{errors.address?.message}</FormDescription>}
            </FormItem>
          )}
        />
        <div className="flex">
          <FormField
            control={control}
            name="province"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>استان</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={e => {
                      const provinceObj = provinces.filter(province => province.id === Number(e))[0];
                      form.setValue('province', provinceObj)
                    }}
                    value={field.value ? String(field.value.id) : ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='استان خودرا انتخاب کنید' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {provinces.map(province => (
                          <SelectItem key={province.id} value={String(province.id)}>{province.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                {errors.province && <FormDescription>{errors.province?.message}</FormDescription>}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="countie"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>شهرستان</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={e => {
                      const countieObj = counties.filter(countie => countie.id === Number(e))[0];
                      form.setValue('countie', countieObj)
                    }}
                    value={field.value ? String(field.value.id) : ''}
                    // value={String(field.value?.id) ?? ''}
                    disabled={!selectedProvice}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='شهرستان خودرا انتخاب کنید' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          form.getValues('province.id')
                            ? counties
                              .filter(countie => countie.province_id === +form.getValues('province.id'))
                              .map(countie => (
                                <SelectItem key={countie.id} value={String(countie.id)}>{countie.name}</SelectItem>
                              ))
                            : null
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                {errors.countie && <FormDescription>{errors.countie?.message}</FormDescription>}
              </FormItem>
            )}
          />
        </div>

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