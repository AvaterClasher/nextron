import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Nextron - Documentation made easy</title>
        <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <SWRConfig
        value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
          <Toaster
            // containerClassName='bg-slate-900 text-slate-50 rounded-sm'
            position='bottom-left'
          />
        </ThemeProvider>
      </SWRConfig>
    </SessionProvider>
  )
}

export default MyApp
