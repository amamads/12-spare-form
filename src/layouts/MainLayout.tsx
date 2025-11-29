import React from 'react'
import { Outlet } from 'react-router'

export const MainLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}
