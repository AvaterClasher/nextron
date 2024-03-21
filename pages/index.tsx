import Nav from '@/components/Nav'
import type { NextPage } from 'next'
import { RoughNotation } from 'react-rough-notation'
import Link from 'next/link'
import Image from 'next/image'
import LandingPageImage from '../public/landing-page-image.png'
import clsx from 'clsx'
import {
  Zap,
  Download,
  Edit,
  Terminal,
  MessageSquare,
  GitHub,
  Moon,
  Box,
} from 'react-feather'
import WorkflowSvg from '@/components/WorkflowSvg'
import { Markdown } from '@/components/ui/Typography'
import { CustomLink } from '@/components/ui/Link'

const Home: NextPage = () => {
  const gradient = 'bg-gradient-to-r text-transparent bg-clip-text'

  return (
    <div>
      <Nav />
      <div>
        <p className='mb-2 text-center text-sm font-semibold uppercase text-slate-500 dark:text-slate-400'>
          Open source. Free forever
        </p>
        <h1 className='text-center text-6xl font-black md:text-[80px]'>
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
          <Link href='/signup'>
            <a className='font-cal block transform rounded bg-blue-500 px-8 py-4 text-2xl font-bold text-white transition-all duration-150 hover:scale-105'>
              Get Started <span className='ml-2'>→</span>
            </a>
          </Link>
        </div>
      </div>
      <div className='mt-24'>
        <div className='mx-auto max-w-5xl'>
          <Image
            src={LandingPageImage}
            alt=''
            placeholder='blur'
            className='rounded-lg shadow-2xl'
          />
        </div>
      </div>

      <div className='mx-auto mt-40 mb-10 max-w-7xl px-10'>
        <div>
          <h2 className='text-7xl font-extrabold'>
            A feature packed <br />
            <span className={clsx(gradient, `from-[#696eff] to-[#f8acff]`)}>
              documentation generator
            </span>
          </h2>
          <p className='mt-3 max-w-2xl text-lg text-slate-700 dark:text-slate-300'>
            Nextron has all the features you need to create a fully fledged
            documentation website for your open source project.
          </p>
        </div>
        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
          {features.map(({ title, description, Icon }) => (
            <div
              key={title}
              className='rounded border p-7 shadow-lg dark:border-slate-800'>
              <Icon size={25} opacity={0.7} />
              <div className='mt-4'>
                <h3 className='text-xl font-bold'>{title}</h3>
                <p className='mt-1 text-base text-slate-700 dark:text-slate-300'>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-32'>
          <h3 className='max-w-3xl text-7xl font-extrabold'>
            <span className='mb-2 opacity-40'>Building docs is boring.</span>
            <br />
            <span>
              But Nextron makes docs{' '}
              <span
                className={clsx(
                  gradient,
                  'from-cyan-500 to-slate-100 dark:from-[#61f4de] dark:to-slate-900'
                )}>
                fun and intuitive
              </span>
            </span>
          </h3>
          <p className='mt-2 max-w-3xl text-lg opacity-70'>
            Just focus on content. Nextron will take care of hosting, feedback
            collection, blog management, SEO, lighthouse score and many more.{' '}
            <RoughNotation
              type='underline'
              strokeWidth={2}
              animationDuration={2000}
              color='rgb(129 140 248)'
              animate
              show>
              <span>Just push to GitHub and it&apos;s done.</span>
            </RoughNotation>
          </p>
          <WorkflowSvg />
        </div>
      </div>
      <div className='w-full py-16'>
        <div className='mx-auto max-w-7xl'>
          <h3 className='text-7xl font-extrabold'>
            <span className={clsx(gradient, 'from-[#1dbde6] to-[#f1515e]')}>
              Prebuilt components{' '}
            </span>
            <Box
              className='relative -top-1 inline-block'
              strokeWidth={3}
              size={40}
            />
          </h3>
          <p className='mt-3 max-w-3xl text-lg opacity-70'>
            <Markdown
              text='Nextron has many prebuilt components that you can just start
            using right away in your markdown files.'
            />
          </p>
          <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5'>
            {[
              'Tooltips',
              'JSX',
              'Code playgrounds',
              'Callouts',
              'And much more...',
            ].map((name) => (
              <div key={name} className='p-4'>
                <h3 className='flex h-full items-center justify-center rounded border bg-white px-4 py-6 text-center text-xl font-semibold text-black dark:border-slate-800 dark:bg-black dark:text-white'>
                  {name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mx-auto mt-20 max-w-7xl'>
        <h3 className=' text-7xl font-extrabold'>
          No more{' '}
          <span
            className={clsx(
              gradient,
              'from-[#6274e7] to-[#8752a3]'
            )}>{`{ config }`}</span>
        </h3>
        <p className='my-3 max-w-3xl text-lg opacity-70'>
          Every documentation generator needs a separate <code>`.json`</code>{' '}
          config file to function properly. Nextron works without any config.
        </p>
      </div>
      <div className='text-invert mx-auto mt-20 mb-5 max-w-7xl rounded-xl py-10 shadow-xl'>
        <h3
          className={clsx(
            gradient,
            'from-[#f44369] to-[#3e3b92] text-center text-7xl font-extrabold'
          )}>
          Supercharge your docs now
        </h3>

        <div className='text-invert mx-auto flex max-w-xs flex-wrap justify-around'>
          <CustomLink
            href='/new'
            className='mt-10 !p-4 text-center text-2xl font-semibold shadow-2xl transition-all hover:scale-105'>
            Get started now →
          </CustomLink>
        </div>
      </div>
      <footer className='mt-10 border-t px-10 py-5 dark:border-slate-700'>
        <div>
          <a
            className='text-blue-400 hover:text-blue-700'
            rel='noopener noreferrer'
            href='https://github.com/AvaterClasher'>
            Made by Soumyadip Moni
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home

const features = [
  {
    title: 'Hosted docs',
    description:
      'Just have a docs/ folder with markdown files and a beautiful documentation site will be generated.',
    Icon: Zap,
  },
  {
    title: 'Auto updating',
    description:
      'Spend a minute on setup and forget the rest. Just keep updating the docs/ folder and the website will auto update automagically.',
    Icon: Download,
  },
  {
    title: 'Customizable',
    description:
      'You can change the look and feel of your docs with available themes and plugin.',
    Icon: Edit,
  },
  {
    title: 'CLI',
    description:
      'You can use Nextron as a CLI tool to generate your docs and deploy them to your server.',
    Icon: Terminal,
  },
  {
    title: 'Feedback Widget',
    description:
      'Every docs comes with a feedback widget to help you get better feedback from your users.',
    Icon: MessageSquare,
  },
  {
    title: 'GitHub as source',
    description:
      'All your documentation lives on GitHub. So you get all the collab features of GitHub.',
    Icon: GitHub,
  },
]
