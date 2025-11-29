import { Button } from '@/components/ui/button'
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function Step1({ form: { control, formState: { errors, isSubmitting } } }: { form: any }) {
    return (
        <>
            <h1 className="text-center text-4xl">مرحله اول</h1>

            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>نام</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="نام را ورد کنید" />
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
                            <Input {...field} placeholder="شماره همراه را وارد کنید" />
                        </FormControl>
                        {errors.phoneNumber && <FormDescription>{errors.phoneNumber?.message}</FormDescription>}
                    </FormItem>
                )}
            />

            <Button type="submit" className="text-lg">
                {isSubmitting ? 'درحال ثبت ...' : "مرحله بعد"}
            </Button>
        </>
    )
}
