import DashboardNav from '@/components/DashboardNav'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Heading1, TextSmall } from '@/components/ui/Typography'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { useForm } from 'react-hook-form'
import type { NewSite } from 'types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { newSiteSchema } from '@/lib/schemas/newSiteSchema'
import { DevTool } from '@hookform/devtools'
import axios from 'axios'

const NewSite = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
  } = useForm<NewSite>({
    resolver: zodResolver(newSiteSchema),
  })

  const createSite = async (data: NewSite) => {
    alert(JSON.stringify(data, null, 2))
    const asd = await axios.post('/api/create/site', {
      ...data,
    })
    alert(JSON.stringify(asd.data, null, 2))
  }

  return (
    <ProtectedRoute>
      <DevTool control={control} />
      <DashboardNav />
      <div className='mx-auto -mt-10 max-w-6xl px-10'>
        <Heading1>
          Create a new{' '}
          <span className='bg-gradient-to-r from-[#696eff] to-[#ff1b6b] bg-clip-text text-transparent'>
            documentation site
          </span>
        </Heading1>
        <div className='mt-16'>
          <form className='max-w-3xl' onSubmit={handleSubmit(createSite)}>
            <label className='my-2 block' htmlFor='siteName'>
              <TextSmall>Name of the new site</TextSmall>
              <input
                className='text-input mt-2 w-full max-w-xl'
                placeholder='Hyperdocs Documentation'
                id='siteName'
                {...register('siteName')}
              />
              {errors.siteName && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.siteName.message}
                </p>
              )}
            </label>
            <br />
            <label className='my-2 block' htmlFor='siteDescription'>
              <TextSmall>Description of the site</TextSmall>
              <textarea
                className='text-input mt-2 w-full max-w-xl'
                placeholder='The simplest way to create docs for your next open source project.'
                id='siteDescription'
                rows={3}
                {...register('siteDescription')}
              />
              {errors.siteDescription && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.siteDescription.message}
                </p>
              )}
            </label>
            <br />
            <label className='mb-10 block' htmlFor='repoLink'>
              <TextSmall>Repository link</TextSmall>
              <input
                className='text-input mt-2 w-full max-w-xl'
                id='repoLink'
                placeholder='https://github.com/lalit2005/hyperdocs'
                {...register('repoLink')}
              />
              {errors.repoLink && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.repoLink.message}
                </p>
              )}
            </label>
            <label className='my-10 block' htmlFor='ogImageUrl'>
              <TextSmall>OG Image URL for this site</TextSmall>
              <input
                className='text-input mt-2 w-full max-w-xl'
                placeholder='https://image.com/my-image.png'
                id='ogImageUrl'
                {...register('ogImageUrl')}
              />
              <TextSmall className='mt-1 text-xs'>
                <span
                  onClick={() => {
                    setValue(
                      'ogImageUrl',
                      `https://cdn.statically.io/og/${encodeURIComponent(
                        getValues().siteName
                      )}`
                    )
                  }}>
                  Click here to auto-generate one from title.
                </span>
              </TextSmall>
              {errors.ogImageUrl && (
                <p className='mt-1 text-sm text-red-400'>
                  {errors.ogImageUrl.message}
                </p>
              )}
            </label>

            <Button type='submit'>Create site</Button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default NewSite
