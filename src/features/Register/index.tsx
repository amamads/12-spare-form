import { useAppSelector } from '@/app/hooks'
import { Card } from '@/components/ui/card'
import React from 'react'
import { selectStep } from './formSlice'
import { Step1 } from './Step1'
import Step3 from './Step3'
import NotFindPage from '@/components/NotFindPage'
import { Step2 } from './Step2'

export const Register = () => {
  const step = useAppSelector(selectStep)

  return (
    <Card className="px-10">
      {step === 1
        ? <Step1 />
        : step === 2
          ? <Step2 />
          : step === 3
            ? <Step3 />
            : <NotFindPage />
      }
    </Card>
  )
}
