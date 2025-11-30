import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router'

export const Home = () => {
    return (
        <div className='flex justify-center'>
            <Button size='lg'>
                <Link to='/register'>Register</Link>
            </Button>
        </div>
    )
}
