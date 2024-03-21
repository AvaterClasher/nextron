import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { NextSeo } from 'next-seo'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <div>
      <NextSeo
        title='Nextron'
        description='Easiest way to build your own documentation website without any config'
        openGraph={{
          url: 'https://nextron.netlify.app',
          title: 'Nextron',
          description:
            'Easiest way to build your own documentation website without any config',
          images: [
            {
              url: 'https://nextron.netlify.app/ogimage.png',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@Avater004',
        }}
      />
      <SessionProvider session={session}>
        <Head>
          <title>Nextron - Documentation made easy</title>
          <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
        </Head>
        <SWRConfig
          value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
          <ThemeProvider attribute='class'>
            <Component {...pageProps} />
            <Toaster position='bottom-left' />
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </div>
  )
}

export default MyApp
