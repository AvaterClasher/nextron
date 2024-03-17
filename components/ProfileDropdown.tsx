import { signOut, useSession } from 'next-auth/react'
import { Tooltip } from 'react-tiny-tooltip'
import { useState } from 'react'
import Avatar from './ui/Avatar'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from './ui/Menu'
import Link from 'next/link'
import { usePrefetch } from 'use-link-prefetch'

const ProfileDropdown = () => {
  const { data } = useSession()
  const [name, img, email] = [
    data?.user?.name,
    data?.user?.image,
    data?.user?.email,
  ]

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <MenuRoot isOpen={isOpen} setIsOpen={setIsOpen}>
        <MenuTrigger>
          <Tooltip content={name || ''} side='left' sideOffset={5}>
            <Avatar img={img || ''} fallBack={name || ''} />
          </Tooltip>
        </MenuTrigger>
        <MenuContent isOpen={isOpen}>
          <MenuItem className='cursor-pointer px-5 py-3 pr-10 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none hover:dark:bg-slate-800 focus:dark:bg-slate-800'>
            <span className='font-bold'>{name}</span>
            <br />
            <p className='mt-1 text-sm opacity-80'>{email}</p>
          </MenuItem>
          <MenuItem link='/docs'>Documentation</MenuItem>
          <MenuItem link='/themes'>Themes</MenuItem>
          <MenuItem link='/showcase'>Showcase</MenuItem>
          <MenuItem link='/account'>Account</MenuItem>
          <MenuSeparator />
          <MenuItem
            callBack={signOut}
            className='text-red-500 hover:underline focus:underline'>
            Logout
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  )
}

export default ProfileDropdown
