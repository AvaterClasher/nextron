import Link from 'next/link'
import Logo from './Logo'
import { useSession } from 'next-auth/react'
import { Menu } from 'react-feather'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/Menu'
import { useState } from 'react'

const Nav = () => {
  const { data, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='sticky top-0 z-50 mb-20 bg-white/70 shadow-sm backdrop-blur-md dark:bg-black/70'>
      <div className='flex items-center justify-between px-5'>
        <div>
          <Logo />
        </div>
        <div>
          <div className='block md:hidden'>
            <MenuRoot isOpen={isOpen} setIsOpen={setIsOpen}>
              <MenuTrigger>
                <div>
                  <Menu className='my-4 inline-block p-1' size={30} />
                </div>
                <MenuContent isOpen={isOpen}>
                  <MenuItem link='/Nextron/docs'>Docs</MenuItem>
                  <MenuItem link='/Nextron/blog'>Blog</MenuItem>
                  <MenuItem link='/login'>Login</MenuItem>
                  {status === 'unauthenticated' || status === 'loading' ? (
                    <MenuItem link='/login'>Login</MenuItem>
                  ) : (
                    <MenuItem link='/dashboard'>Dashboard</MenuItem>
                  )}
                </MenuContent>
              </MenuTrigger>
            </MenuRoot>
          </div>
          <ul className='hidden space-x-10 py-5 md:block'>
            <Link href='/docs'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Docs
              </a>
            </Link>
            <Link href='/showcase'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Showcase
              </a>
            </Link>
            <Link href='/themes'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Themes
              </a>
            </Link>
            <Link href='/login'>
              <a className='opacity-60 transition-all hover:opacity-100'>
                Login
              </a>
            </Link>
            {status === 'unauthenticated' || status === 'loading' ? (
              <Link href='/signup'>
                <a className='text-invert rounded px-4 py-2'>Sign Up</a>
              </Link>
            ) : (
              <Link href='/dashboard'>
                <a className='text-invert rounded px-4 py-2'>Dashboard</a>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
