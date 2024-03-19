// @ts-nocheck
import { GetStaticPaths, GetStaticProps } from 'next'
import prisma from '@/utils/prisma'
import { Octokit } from 'octokit'
import parseGitHubUrl from 'parse-github-url'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import axios from 'axios'
import bundleMdxContent from '@/lib/mdx-bundler'
import Head from 'next/head'

const Page = ({ files, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <div>
      <Head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/atom-one-dark.min.css'
        />
      </Head>
      {/* <pre>{JSON.stringify(files, null, 2)}</pre> */}
      <div className='prose-lg prose-slate mx-auto mt-10 max-w-3xl px-3 text-slate-800 prose-headings:font-bold prose-headings:text-slate-800 prose-a:rounded-sm prose-a:p-[2px] prose-a:text-blue-500 hover:prose-a:bg-blue-100 prose-blockquote:border-l-4 prose-blockquote:border-slate-600 prose-blockquote:py-1 prose-pre:overflow-x-scroll prose-pre:bg-[#282C34] prose-ol:list-decimal prose-ul:list-disc dark:prose-invert dark:text-slate-200 dark:prose-headings:text-slate-50 dark:prose-a:text-blue-400 dark:hover:prose-a:bg-slate-700 dark:prose-hr:divide-slate-600'>
        <Component />
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
  })

  console.log(siteData)

  const octokit = new Octokit({
    auth: process.env.GITHUB_APIKEY || '',
  })

  // get repo owner and repo name from siteData?.repoUrl
  const repoUrl = siteData?.repoLink as string

  console.log(repoUrl)

  const repoLinkData = parseGitHubUrl(repoUrl)

  console.log(repoLinkData)

  // get all files from /docs folder in the repo
  const files = await octokit.rest.repos.getContent({
    owner: repoLinkData?.owner as string,
    repo: repoLinkData?.repo?.split('/')[1] as string,
    path: 'docs',
  })

  console.log(files)

  // check if files is an array
  if (!Array.isArray(files.data)) {
    // filter out files that are not markdown files
    console.log('files is not an array')
  }

  const markdownFiles = files.data.filter(
    (file) => file.type === 'file' && file.name.endsWith('.md')
  )

  // combine the contents of all the files and bundle them and return them as props
  const filesContents = await Promise.all(
    markdownFiles.map(async (file) => {
      const fileContents = await octokit.rest.repos.getContent({
        owner: repoLinkData?.owner as string,
        repo: repoLinkData?.repo?.split('/')[1] as string,
        path: `docs/${file.name}`,
      })

      // base64 decode the fileContents.data.content from atob
      const decodedFileContents = Buffer.from(
        fileContents.data.content,
        'base64'
      ).toString('utf8')
      return decodedFileContents
    })
  )

  const filesContentsBundled = await bundleMdxContent(filesContents.join('\n'))

  return {
    props: {
      files: filesContentsBundled,
      code: filesContentsBundled.code,
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
