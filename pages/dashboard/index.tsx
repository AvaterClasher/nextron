import DashboardNav from '@/components/DashboardNav'
import { CustomLink } from '@/components/ui/Link'
import { Input } from '@/components/ui/Input'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Plus } from 'react-feather'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        const searchInput = document.getElementById(
          'search-input'
        ) as HTMLInputElement
        searchInput.value === '' && e.preventDefault()
        searchInput.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <ProtectedRoute>
      <DashboardNav />
      <div className='mx-auto max-w-6xl px-10'>
        <div className='flex w-full justify-between'>
          <Input
            onChange={(e) => {
              setSearchQuery(e.target.value)
            }}
            placeholder='Search...'
            id='search-input'
            className='w-full max-w-[10/12]'
          />
          <CustomLink href='/new' className='!ml-5 block w-52 p-0 text-center'>
            <Plus className='relative -top-px inline-block' /> New Project
          </CustomLink>
        </div>
        <p className='mt-5'>Search results for: {searchQuery}</p>
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard
