import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Logo from './Logo'
import ProfileDropdown from './ProfileDropdown'

const DashboardNav = () => {
  const { data } = useSession()

  return (
    <nav className='g-white/50 sticky top-0 z-10 mb-20 backdrop-blur-sm backdrop-filter dark:bg-slate-900/50'>
      <div className='flex items-center justify-between px-5'>
        <div>
          <Logo href='/dashboard' />
        </div>
        <div>
          <ul className='py-5'>
            <ProfileDropdown />
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav
