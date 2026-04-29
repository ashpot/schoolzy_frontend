import { Outlet } from 'react-router-dom'

export default function AuthLayout(): React.ReactElement {
  return(
    <main className='min-h-screen'>
      <Outlet/>
    </main>
  )
}