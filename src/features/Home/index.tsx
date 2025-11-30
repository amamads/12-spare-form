import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router'

export const Home = () => {
    return (
        <div>
            <Button>
                <Link to='/register'>Register</Link>
            </Button>
        </div>
    )
}
