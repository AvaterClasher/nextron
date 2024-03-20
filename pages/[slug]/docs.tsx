import { GetStaticPaths, GetStaticProps } from 'next'
import prisma from '@/utils/prisma'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import bundleMdxContent from '@/lib/mdx-bundler'
import Head from 'next/head'
import DocsNav from '@/components/docs/navbar'
import getAllFiles from '@/utils/getAllFiles'
import invariant from 'tiny-invariant'
import getFileContent from '@/utils/getFile'
import { Remarkable } from 'remarkable'
// @ts-ignore
import mdToc from 'markdown-toc'
// @ts-ignore

const Page = ({ finalMdxCode: { code }, tocHtml, navLinks, navCta, logo }) => {
  const Component = useMemo(() => getMDXComponent(code), [code])
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
        <div className='mx-auto'>
          <div className='flex flex-row flex-wrap py-5'>
            <aside className='w-full border-r-2 border-slate-300 dark:border-slate-600'>
              <div className='sticky top-20 w-full p-4'>
                <div className='flex flex-col overflow-hidden'>
                  <ul
                    dangerouslySetInnerHTML={{ __html: tocHtml }}
                    className='prose space-y-4 text-opacity-50 prose-li:underline-offset-4 dark:prose-invert'></ul>
                </div>
              </div>
            </aside>
            <main role='main' className='w-full px-10 pt-4 sm:w-8/12'>
              <div className='prose-lg prose-slate px-3 text-slate-800 prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:text-slate-800 prose-a:rounded-sm prose-a:p-[2px] prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1 prose-pre:overflow-x-scroll prose-pre:bg-[#282C34] prose-ol:list-decimal prose-ul:list-disc dark:prose-invert dark:text-slate-200 dark:prose-headings:text-slate-50 dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 dark:prose-hr:divide-slate-600'>
                <Component />
              </div>
            </main>
            <div className='w-full px-2 sm:w-2/12'>
              <div className='sticky top-20 w-full border-l border-slate-300 p-4 dark:border-slate-700'>
                <div className='flex flex-col'>
                  <ul className='space-y-4'>
                    <li>Lorem, ipsum.</li>
                    <li>Saepe, eius?</li>
                    <li>Ducimus, omnis.</li>
                    <li>Error, cumque!</li>
                    <li>Modi, quidem?</li>
                    <li>Ducimus, officiis.</li>
                    <li>Ipsum, aut?</li>
                    <li>Hic, eveniet.</li>
                    <li>Tenetur, odit!</li>
                    <li>Laboriosam, quis?</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className='mt-auto'>...</footer>
      </div>
    </div>
  )
}

export default Page

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  console.log(slug)

  const siteData = await prisma.site.findUnique({
    where: {
      siteSlug: slug,
    },
    include: {
      navbarLinks: true,
    },
  })

  const files = await getAllFiles(
    siteData?.repoLink || '',
    siteData?.gitHubAccessToken?.toString()
  )

  invariant(files, 'No files found')

  const mdToHtml = new Remarkable()

  interface MdFileInfo {
    mdxCode: string
    toc: string
    name: string
    content: string
  }

  // @ts-ignore
  const bundledFilesArray = files.data.map(async (file) => {
    const content = await getFileContent(
      siteData?.repoLink || '',
      file.name,
      siteData?.gitHubAccessToken?.toString()
    )

    const tocHtml = mdToHtml.render(mdToc(content).content)

    return {
      toc: tocHtml,
      name: file.name,
      content: `# ${file.name.slice(0, -3).replace(/-/gi, ' ')} \n ${content
        .toString()
        .trim()}`,
    }
  })

  const bundledFiles: MdFileInfo[] = await Promise.all(bundledFilesArray)

  console.log(bundledFiles)

  const finalToc = mdToHtml.render(
    mdToc(bundledFiles.map((file) => file.content).join('\n')).content
  )
  console.log(finalToc)

  return {
    props: {
      // bundledFiles: bundledFiles,
      // combine all files' content
      finalMdxCode: await bundleMdxContent(
        bundledFiles.map((file) => file.content).join('\n')
      ),
      tocHtml: finalToc,
      navLinks: siteData?.navbarLinks,
      navCta: siteData?.navbarCta,
      logo: siteData?.siteName,
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
