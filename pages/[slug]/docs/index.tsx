import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
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
import DocsLayout from '@/layouts/DocsLayout'
import { DocsPageProps } from 'types/types'
// @ts-ignore
const Page: NextPage<DocsPageProps> = ({
  content,
  tocHtml,
  navLinks,
  navCta,
  logo,
  sidebar,
  slug,
  siteId,
}) => {
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
        <DocsLayout
          siteId={siteId}
          LeftSidebarContent={() => (
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
          )}
          RightSidebarContent={() => (
            <div>
              <p className='mb-8 text-xs uppercase'>On this page</p>
              <ul
                dangerouslySetInnerHTML={{ __html: tocHtml }}
                className='prose space-y-4 text-opacity-50 prose-li:underline-offset-4 dark:prose-invert'></ul>
            </div>
          )}>
          <div className='prose-lg prose-slate px-3 text-slate-800 prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:text-slate-800 prose-a:rounded-sm prose-a:p-[2px] prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1 prose-pre:overflow-x-scroll prose-pre:bg-[#282C34] prose-ol:list-decimal prose-ul:list-disc dark:prose-invert dark:text-slate-200 dark:prose-headings:text-slate-50 dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 dark:prose-hr:divide-slate-600'>
            <Component />
          </div>
        </DocsLayout>
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
    // * Make sure to change the DocsPageProps in @types/types.ts
    props: {
      content: (await bundleMdxContent(`${content.toString().trim()}`)).code,
      tocHtml: tocHtml,
      sidebar: filesArray,
      navLinks: siteData?.navbarLinks,
      navCta: siteData?.navbarCta,
      logo: siteData?.siteName,
      slug: siteData?.siteSlug,
      siteId: siteData?.id,
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
