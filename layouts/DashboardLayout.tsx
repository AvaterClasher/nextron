import ProfileDropdown from '@/components/ProfileDropdown'
import { CustomLink } from '@/components/ui/Link'
import { Heading1 } from '@/components/ui/Typography'
import ProtectedRoute from '@/lib/ProtectedRoute'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Logo from '@/components/Logo'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'

type ActiveTab =
  | 'overview'
  | 'snippet'
  | 'blog'
  | 'feedbacks'
  | 'integrations'
  | 'navbar'
  | 'announcement'
  | 'settings'

interface SideBarLinks {
  name: string
  href: string
  active: ActiveTab
}

const DashboardLayout: React.FC<{
  title: string
  subtitle: string
  active: ActiveTab
}> = ({ title, subtitle, active, ...props }) => {
  const router = useRouter()
  const siteId = router.query.siteId as string
  const { data } = useSession()
  const user = data?.user

  const sideBarLinks: SideBarLinks[] = [
    {
      name: 'Overview',
      href: `/dashboard/${siteId}`,
      active: 'overview',
    },
    {
      name: 'Snippet injection',
      href: `/dashboard/${siteId}/snippet`,
      active: 'snippet',
    },
    {
      name: 'Blog',
      href: `/dashboard/${siteId}/blog`,
      active: 'blog',
    },
    {
      name: `Feedbacks`,
      href: `/dashboard/${siteId}/feedbacks`,
      active: 'feedbacks',
    },
    {
      name: `Navbar`,
      href: `/dashboard/${siteId}/navbar`,
      active: 'navbar',
    },
    {
      name: `Announcement`,
      href: `/dashboard/${siteId}/announcement`,
      active: 'announcement',
    },
    {
      name: `Settings`,
      href: `/dashboard/${siteId}/settings`,
      active: 'settings',
    },
  ]

  return (
    <ProtectedRoute>
      <div className='flex h-screen w-screen'>
        <aside className='relative w-2/12 border-r-2 border-r-slate-200 pt-24 dark:border-r-slate-800'>
          <div className='absolute top-0 p-4'>
            <Logo href='/dashboard' />
          </div>
          <ul className='space-y-3 px-4'>
            {sideBarLinks.map((link, index) => {
              return (
                <li key={index}>
                  <CustomLink
                    href={link.href}
                    noInvert
                    className={clsx(
                      'border-none',
                      active === link.active &&
                        '!bg-slate-100 font-semibold dark:!bg-slate-700 dark:!text-white'
                    )}>
                    {link.name}
                  </CustomLink>
                </li>
              )
            })}
          </ul>
          <div>
            <div className='absolute bottom-0 inline-block w-full'>
              <div>
                <CustomLink
                  href='/dashboard'
                  noInvert
                  className='mt-3 block border-none !bg-slate-100 px-5 py-3 text-sm text-slate-400 hover:font-bold dark:!bg-slate-900'>
                  {'<-'} Go back
                </CustomLink>
                {/* <Link href='/dashboard'>
                  <a className=''></a>
                </Link> */}
              </div>
              <div className='items-center justify-between border-t border-t-slate-300 bg-slate-100 px-5 py-2 pt-5 dark:border-t-slate-700 dark:bg-slate-900'>
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </aside>
        <main className='mt-24 w-10/12 pl-16'>
          <Heading1>{title}</Heading1>
          <p className='text-light mb-16 mt-5 text-lg'>
            <ReactMarkdown>{subtitle}</ReactMarkdown>
          </p>
          {props.children}
        </main>
      </div>
    </ProtectedRoute>
  )
}

export default DashboardLayout
