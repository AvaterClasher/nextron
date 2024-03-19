import { Button } from '@/components/ui/Button'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/Menu'
import { Heading3, TextSmall } from '@/components/ui/Typography'
import DashboardLayout from '@/layouts/DashboardLayout'
import shikiThemes from '@/lib/shikiThemes'
import { Site } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ChevronDown } from 'react-feather'
import useSWR from 'swr'

const Settings = () => {
  const router = useRouter()
  const { data, mutate } = useSWR<Site>(
    `/api/get/site/?siteId=${router.query.siteId}`
  )

  const [isCodeblocksThemeSelectMenuOpen, setisCodeblocksThemeSelectMenuOpen] =
    useState<boolean>(false)

  const [theme, setTheme] = useState(data?.shikiTheme)

  return (
    <DashboardLayout
      title='Settings'
      subtitle='Settings that control the behavior of the documentation website'
      active='settings'
    >
      <div>
        <div>
          <Card
            title='Code blocks theme'
            subtitle='Select the theme you want for code blocks on the docs site'
          >
            <MenuRoot
              isOpen={isCodeblocksThemeSelectMenuOpen}
              setIsOpen={setisCodeblocksThemeSelectMenuOpen}
            >
              <MenuTrigger>
                <Button
                  noInvert
                  className='flex w-full items-center justify-between capitalize'
                  onClick={() => {
                    setisCodeblocksThemeSelectMenuOpen(
                      !isCodeblocksThemeSelectMenuOpen
                    )
                  }}
                >
                  <p>{theme?.replace(/\-/g, ' ') || 'Atom One Dark'}</p>
                  <div className='ml-5 block'>
                    <ChevronDown size={15} />
                  </div>
                </Button>
              </MenuTrigger>
              <MenuContent
                isOpen={isCodeblocksThemeSelectMenuOpen}
                side='bottom'
              >
                {shikiThemes.map((theme) => {
                  return (
                    <MenuItem
                      key={theme}
                      callBack={() => {
                        setisCodeblocksThemeSelectMenuOpen(false)
                        setTheme(theme)
                        axios
                          .post('/api/update/shiki-theme', {
                            shikiTheme: theme,
                            siteId: data?.id,
                          })
                          .then(({ data }) => {
                            mutate(data)
                          })
                      }}
                    >
                      <p className='capitalize'>{theme.replace(/\-/g, ' ')}</p>
                    </MenuItem>
                  )
                })}
              </MenuContent>
            </MenuRoot>
          </Card>
        </div>
        <Card
          title='Danger'
          subtitle='Delete your site permanently, this cannot be reversed'
        >
          <Button className='font-bold !text-red-400' noInvert>
            Delete {data?.siteName}
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  )
}

export default Settings

const Card: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
  ...props
}) => {
  return (
    <div>
      <div className='my-5 w-full max-w-3xl rounded border p-4 shadow-sm dark:border-slate-700'>
        <Heading3>{title}</Heading3>
        <TextSmall className='my-2'>{subtitle}</TextSmall>
        <div className='mt-6'>{props.children}</div>
      </div>
    </div>
  )
}
