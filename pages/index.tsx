import Nav from '@/components/Nav'
import type { NextPage } from 'next'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { RoughNotation } from 'react-rough-notation'

const Home: NextPage = () => {
  const { setTheme, theme } = useTheme()
  return (
    <div>
      <Nav />
      <div className='mt-20'>
        <p className='mb-[23px] text-center text-sm font-semibold uppercase text-slate-500 dark:text-slate-400'>
          Open source. Free forever
        </p>
        <h1 className='text-center text-6xl font-black md:text-7xl '>
          Simplest way to{' '}
          <p className='inline bg-gradient-to-r from-[#40c9ff] to-[#e81cff] bg-clip-text text-transparent'>
            create docs{' '}
          </p>
          <br /> for your open source projects
        </h1>
        <p className='mt-10 text-center text-2xl text-slate-700 dark:text-slate-300'>
          Just add a{' '}
          <code className='text-blue-600 dark:text-blue-300'>`/docs`</code>{' '}
          folder with{' '}
          <code className='text-blue-600 dark:text-blue-300'>`markdown`</code>{' '}
          files and get a hosted,{' '}
          <RoughNotation
            type='underline'
            strokeWidth={2}
            animationDuration={2000}
            color='rgb(129 140 248)'
            animate
            show>
            <span>auto-updating</span>
          </RoughNotation>{' '}
          <br /> documentation website up in less than 30 seconds
        </p>
      </div>

      <div className='mt-24 grid items-start justify-center gap-8'>
        <div className='group relative'>
          <div className='animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur-2xl filter transition duration-1000 group-hover:opacity-100 group-hover:duration-200'></div>
          <a
            className='font-cal block transform rounded bg-blue-500 px-8 py-4 text-2xl font-bold text-white transition-all duration-150 hover:scale-105'
            href='/auth/login'>
            Get Started <span className='ml-2 '>→</span>
          </a>
        </div>
      </div>

      {/* <div className='mt-32'>
        <h2 className='text-center text-4xl font-extrabold'>
          Documentation. Made Simple
        </h2>
      </div>
      <button onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
        Toggle theme
      </button>
      <p>{theme}</p> */}
    </div>
  )
}

export default Home
