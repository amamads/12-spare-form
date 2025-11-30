import { useAppSelector } from '@/app/hooks'
import { Card } from '@/components/ui/card'
import { selectStep } from './formSlice'
import { Step1 } from './Step1'
import { Step3 } from './Step3'
import NotFindPage from '@/components/NotFindPage'
import { Step2 } from './Step2'
import { Result } from './Result'

export const Register = () => {
  const step = useAppSelector(selectStep)

  function GetPage() {
    if (step == 1) return <Step1 />
    else if (step == 2) return <Step2 />
    else if (step == 3) return <Step3 />
    else if (step == 4) return <Result />
    else <NotFindPage />
  }

  return (
    <Card className="px-10">
      <GetPage />
    </Card>
  )
}
