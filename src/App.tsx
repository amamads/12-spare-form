import { Outlet } from 'react-router'
import { Navbar } from './components/Navbar'


export default function App() {
  return (
    <div className='w-9/10 mx-auto'>
      <Navbar />
      <Outlet />
      {/* <p className='absolute bottom-1 left-1 text-lg'>path: {window.location.pathname}</p> */}
    </div>
  )
}