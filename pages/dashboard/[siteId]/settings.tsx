import { Button } from '@/components/ui/Button'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/Menu'
import { Heading3, TextSmall } from '@/components/ui/Typography'
import DashboardLayout from '@/layouts/DashboardLayout'
// import shikiThemes from '@/lib/shikiThemes'
import { Site } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

const Settings = () => {
  const router = useRouter()
  const { data, mutate } = useSWR<Site>(
    `/api/get/site/?siteId=${router.query.siteId}`
  )

  const [isCodeblocksThemeSelectMenuOpen, setisCodeblocksThemeSelectMenuOpen] =
    useState<boolean>(false)

  // const [theme, setTheme] = useState(data?.shikiTheme)

  return (
    <DashboardLayout
      title='Settings'
      subtitle='Settings that control the behavior of the documentation website'
      active='settings'>
      <div>
        <Card
          title='Danger'
          subtitle='Delete your site permanently, this cannot be reversed'>
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
