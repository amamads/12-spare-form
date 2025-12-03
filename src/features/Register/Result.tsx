import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { selectAddress, selectAvatar, selectCountie, selectEmail, selectForm, selectFormValues, selectName, selectNationalCode, selectPhoneNumber, selectProvince, setStep } from './formSlice'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'

export const Result = () => {
    const dispatch = useAppDispatch();

    const {
        name,
        phoneNumber,
        email,
        nationalCode,
        address,
        province,
        countie,
        avatar
    } = useAppSelector(selectForm);


    return (
        <>
            <h1 className='text-4xl text-center'>مشخصات</h1>
            <Card>
                <CardTitle className='grid justify-center gap-6'>
                    <Avatar
                        className='border-3 border-black dark:border-white rounded-full overflow-hidden'
                    >
                        <AvatarImage src={avatar.url} className='w-40 rounded-full' />
                        <AvatarFallback className='bg-zinc-600 text-yellow-500'>AMS</AvatarFallback>
                    </Avatar>
                </CardTitle>
                <Separator />
                <CardContent className='space-y-5'>
                    <p>اسم: {name}</p>
                    <p>شماره همراه: {phoneNumber}</p>
                    <p>ایمیل: {email}</p>
                    <p>کد ملی: {nationalCode}</p>
                    <p>آدرس: {address}</p>
                    <p>استان: {province?.name}</p>
                    <p>شهرستان: {countie?.name}</p>
                </CardContent>
            </Card>
            <Button
                onClick={() => dispatch(setStep(3))}
                className="text-lg flex-1"
            >
                ویرایش
            </Button>
        </>
    )
}
