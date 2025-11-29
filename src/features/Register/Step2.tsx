import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { selectName, selectPhoneNumber, setStep } from './formSlice';
import { Card, CardContent } from '@/components/ui/card';

export default function Step2({ form: { control, formState: { errors, isSubmitting } } }: { form: any }) {
  const dispatch = useAppDispatch();

  const name = useAppSelector(selectName)
  const phoneNumber = useAppSelector(selectPhoneNumber)

  return (
    <>
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
              <Input {...field} placeholder="ایمیل را وارد کنید" />
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

    </>
  )
}
