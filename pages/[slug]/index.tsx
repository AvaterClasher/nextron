import { GetStaticPaths, GetStaticProps } from 'next'
import prisma from '@/utils/prisma'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import bundleMdxContent from '@/lib/mdx-bundler'
import Head from 'next/head'
import DocsNav from '@/components/docs/navbar'
import getAllFiles from '@/utils/getAllFiles'
import getFileContent from '@/utils/getFile'
import { Remarkable } from 'remarkable'
// @ts-ignore
import mdToc from 'markdown-toc'
// @ts-ignore
const Page = ({ content, tocHtml, navLinks, navCta, logo, sidebar, slug }) => {
  const Component = useMemo(() => getMDXComponent(content), [content])
  return (
    <div>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/atom-one-dark.min.css'
        />
      </Head>
      <div>
        <div className='sticky top-0'>
          <DocsNav links={navLinks} navbarCta={navCta} logo={logo} />
        </div>
        <div className='max-w-8xl mx-auto px-4 sm:px-6 md:px-8'>
          <div className='fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-64 overflow-y-auto border-r-2 border-r-slate-200 px-7 pb-10 dark:border-slate-700 lg:block'>
            <ul className='mt-10 space-y-4'>
              {sidebar.map((file: string) => {
                return (
                  <li key={file}>
                    <a
                      className='block rounded px-3 py-2 capitalize hover:bg-slate-50 dark:hover:bg-slate-800'
                      href={`/${slug}/docs/${file}`}>
                      {file.replace(/-/gi, ' ')}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='lg:pl-72'>
            <div className='mx-auto max-w-3xl pt-10 xl:ml-0 xl:mr-[15.5rem] xl:max-w-none xl:pr-16'>
              <main className='relative z-20 mt-8'>
                <div className='prose-lg prose-slate px-3 text-slate-800 prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:text-slate-800 prose-a:rounded-sm prose-a:p-[2px] prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1 prose-pre:overflow-x-scroll prose-pre:bg-[#282C34] prose-ol:list-decimal prose-ul:list-disc dark:prose-invert dark:text-slate-200 dark:prose-headings:text-slate-50 dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 dark:prose-hr:divide-slate-600'>
                  <Component />
                </div>
              </main>
              <footer className='mt-12 text-sm leading-6'>Footer</footer>
              <div className='fixed top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] z-20 hidden w-[19.5rem] overflow-y-auto py-10 px-8 xl:block'>
                <div className='sticky max-h-[calc(var(--vh)-4rem)] overflow-y-auto'>
                  <p className='mb-8 text-xs uppercase'>On this page</p>
                  <ul
                    dangerouslySetInnerHTML={{ __html: tocHtml }}
                    className='prose space-y-4 text-opacity-50 prose-li:underline-offset-4 dark:prose-invert'></ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const filename = 'index'

  console.log(filename)

  const siteData = await prisma.site.findUnique({
    where: {
      siteSlug: slug,
    },
    include: {
      navbarLinks: true,
    },
  })

  const mdToHtml = new Remarkable()

  const allFiles = await getAllFiles(
    siteData?.repoLink || '',
    siteData?.gitHubAccessToken || ''
  )

  console.log(allFiles)

  // @ts-ignore
  let filesArray = allFiles.data.map((file) => file.name.replace(/\.md$/, ''))

  filesArray = filesArray.filter((file: string) => file !== 'index')

  const content = await getFileContent(
    siteData?.repoLink || '',
    filename + '.md',
    siteData?.gitHubAccessToken?.toString()
  )

  const tocHtml = mdToHtml.render(mdToc(content).content)

  return {
    props: {
      content: (await bundleMdxContent(`${content.toString().trim()}`)).code,
      tocHtml: tocHtml,
      sidebar: filesArray,
      navLinks: siteData?.navbarLinks,
      navCta: siteData?.navbarCta,
      logo: siteData?.siteName,
      slug: siteData?.siteSlug,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
