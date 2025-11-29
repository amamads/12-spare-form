import App from './App'
import { createBrowserRouter } from 'react-router'
import { AuthLayout, MainLayout } from './layouts';
import { Home, Register } from './features';

const ROUTES = {
    auth: {
        login: '/login',
        register: '/register'
    },
    main: {
        projects: './projects',
        profile: './profile'
    }
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            {
                element: <AuthLayout />,
                children: [
                    { path: ROUTES.auth.register, element: <Register /> }
                ]
            }
        ]
    }
])
// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         children: [
//             { index: true, element: <Home /> },
//             {
//                 element: <AuthLayout />,
//                 children: [
//                     { path: ROUTES.auth.login, element: <Login /> },
//                     { path: ROUTES.auth.register, element: <Register /> }
//                 ]
//             },
//             {
//                 element: <MainLayout />,
//                 children: [
//                     { path: ROUTES.main.projects, element: <Projects /> },
//                     { path: ROUTES.main.profile, element: <Profile /> }
//                 ]
//             },
//             { path: '/*', element: <NotFindPage /> }
//         ]
//     }
// ])
export default router;