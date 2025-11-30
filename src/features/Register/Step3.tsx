import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { file, refine, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { isMobilePhone } from "validator";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectName, selectPhoneNumber, selectStep, setName, setPhoneNumber, setStep, setStep1Values, setStep3Values } from "./formSlice";
import ams from '../../../public/amamads.png'

const MAX_FILE_SIZE = (1024 ** 2) * 3,
  MAX_WIDTH = 1024,
  MAX_HEIGHT = 1024;

const schema = z.object({
  avatar: z
    .any()
    .refine((file) => file?.length > 0, "لطفا یک عکس انتخاب کنید")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "حداکثر حجم عکس 3MB است")
    .refine(async (file) => {
      if (!file) return;
      const img = new Image();
      const objectUrl = URL.createObjectURL(file?.[0]);

      return new Promise<boolean>((resolve) => {
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(img.width <= MAX_WIDTH && img.height <= MAX_HEIGHT);
        };
        img.onerror = () => resolve(false);
        img.src = objectUrl;
      });
    }, 'ابعاد عکس بیش از حد مجاز است')
})
export type FormFieldesStep3 = z.infer<typeof schema>;

export const Step3 = () => {
  const dispatch = useAppDispatch();

  const step = useAppSelector(selectStep)
  const name = useAppSelector(selectName)
  const phoneNumber = useAppSelector(selectPhoneNumber)

  const form = useForm<FormFieldesStep3>({
    resolver: zodResolver(schema),
    defaultValues: {}
  })
  const { control, formState: { errors, isSubmitting } } = form


  // function fromOnSubmit(data: SubmitHandler<FormFieldesStep3>) {
  function fromOnSubmit(data: FormFieldesStep3) {
    // console.log(data.avatar?.[0]);
    dispatch(setStep3Values({
      avatar: {
        name: data.avatar?.[0].name,
        size: data.avatar?.[0].size,
        type: data.avatar?.[0].type,
        url: URL.createObjectURL(data.avatar?.[0])
      }
    }))
    dispatch(setStep(4))
  }
  // console.log(useAppSelector(s => s.form.avatar));

  return (

    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(fromOnSubmit)}
        className="space-y-8 grid"
      >
        <h1 className="text-center text-4xl">مرحله سوم</h1>

        <FormField
          control={control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>عکس</FormLabel>
              <FormControl>
                <Input
                  // {...field}
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    field.onChange(e.target.files)
                  }}
                />
              </FormControl>
              {errors.avatar && typeof errors.avatar.message === "string" && (
                <FormDescription>{errors.avatar.message}</FormDescription>
              )}
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <Button
            onClick={() => dispatch(setStep(2))}
            className="text-lg flex-1">
            مرحله قبل
          </Button>
          <Button type="submit" className="text-lg flex-1">
            {isSubmitting ? 'درحال ثبت ...' : "ثبت"}
          </Button>
        </div>
      </form>
    </Form>
  );
};