import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from './theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'


export const Navbar = () => {
    const { setTheme, theme } = useTheme();
    function changeTheme() {
        if (theme === 'light') return setTheme('dark')
        setTheme('light')
    }
    return (
        <nav className='flex justify-between py-3'>
            <div>
                <Button variant='outline'
                    onClick={changeTheme}
                >
                    {theme === 'light'
                        ? <Sun />
                        : <Moon />
                    }
                </Button>
            </div>
            <div>
                <Avatar className='border-3 border-black dark:border-white'>
                    <AvatarImage src="https://avatars.githubusercontent.com/amamads" />
                    <AvatarFallback className='bg-zinc-600 text-yellow-500'>AMS</AvatarFallback>
                </Avatar>
            </div>
        </nav>

    )
}

