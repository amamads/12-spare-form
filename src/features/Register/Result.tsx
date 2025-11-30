import { useAppSelector } from '@/app/hooks'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { selectAddress, selectAvatar, selectCountie, selectEmail, selectName, selectNationalCode, selectPhoneNumber, selectProvince } from './formSlice'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

export const Result = () => {
    const Name = useAppSelector(selectName)
    const PhoneNumber = useAppSelector(selectPhoneNumber)
    const Email = useAppSelector(selectEmail)
    const NationalCode = useAppSelector(selectNationalCode)
    const address = useAppSelector(selectAddress)
    const Province = useAppSelector(selectProvince)
    const Countie = useAppSelector(selectCountie)
    const avatar = useAppSelector(selectAvatar)

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
                    <p>اسم: {Name}</p>
                    <p>شماره همراه: {PhoneNumber}</p>
                    <p>ایمیل: {Email}</p>
                    <p>کد ملی: {NationalCode}</p>
                    <p>آدرس: {address}</p>
                    <p>استان: {Province?.name}</p>
                    <p>شهرستان: {Countie?.name}</p>
                </CardContent>
            </Card>
        </>
    )
}
