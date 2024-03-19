import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Heading3, Markdown, TextSmall } from '@/components/ui/Typography'
import DashboardLayout from '@/layouts/DashboardLayout'
// import shikiThemes from '@/lib/shikiThemes'
import { Site } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import toast from 'react-hot-toast'

const Settings = () => {
  const router = useRouter()
  const { data, mutate } = useSWR<Site>(
    `/api/get/site/?siteId=${router.query.siteId}`
  )

  const [ghToken, setGhToken] = useState(data?.gitHubAccessToken)
  const [web3formsKey, setWeb3formsKey] = useState(data?.web3formsKey)

  return (
    <DashboardLayout
      title='Settings'
      subtitle='Settings that control the behavior of the documentation website'
      active='settings'>
      <div>
        <Card
          title='GitHub token'
          subtitle='Add this if you want to host docs from a _private repo_. You can get your token from [here](https://github.com/settings/tokens/new). Make sure you **give access to repos** while creating the token'>
          <div className='flex'>
            <Input
              className='mr-3 w-full'
              placeholder='ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
              value={ghToken || ''}
              onChange={(e) => {
                setGhToken(e.target.value)
              }}
            />
            <Button
              onClick={() => {
                const req = axios.post('/api/update/github-token', {
                  siteId: data?.id,
                  ghToken,
                })
                toast.promise(req, {
                  loading: 'Updating...',
                  success: 'Updated successfully!',
                  error: 'Failed to update!',
                })
              }}>
              Save
            </Button>
          </div>
        </Card>
        <Card
          title='Web3forms API key'
          subtitle='Get your API key from [here](https://web3forms.com). This API key will be used for sending an email to you once a **feedback** is submitted from the docs site. You can access all the feedbacks here in the dashboard too.'>
          <div className='flex'>
            <Input
              className='mr-3 w-full'
              placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
              value={web3formsKey || ''}
              onChange={(e) => {
                setWeb3formsKey(e.target.value)
              }}
            />
            <Button
              onClick={() => {
                const req = axios.post('/api/update/web3forms-key', {
                  siteId: data?.id,
                  web3formsKey,
                })
                toast.promise(req, {
                  loading: 'Updating...',
                  success: 'Updated successfully!',
                  error: 'Failed to update!',
                })
              }}>
              Save
            </Button>
          </div>
        </Card>
        <Card
          title='Danger'
          subtitle='Delete your site **permanently**, this cannot be reversed'>
          <Button className='w-full font-bold !text-red-400' noInvert>
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
      <div className='my-9 w-full max-w-3xl rounded border p-4 shadow-sm dark:border-slate-700'>
        <Heading3>{title}</Heading3>
        <TextSmall className='my-2'>
          <Markdown text={subtitle} />
        </TextSmall>
        <div className='mt-6 max-w-xl'>{props.children}</div>
      </div>
    </div>
  )
}
