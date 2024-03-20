import { useRef } from 'react'
import { Clipboard, Info } from 'react-feather'

const DocsMDXcomponents = {
  pre: (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<HTMLPreElement>(null)

    return (
      <pre ref={ref} {...props} className='relative'>
        <button
          className='absolute right-3 top-2 inline-block'
          onClick={() => copyToClipboard(ref.current?.textContent)}>
          <Clipboard className='h-6 w-6 text-slate-400 transition-all hover:scale-105 hover:text-slate-50' />
        </button>
        {props?.children}
      </pre>
    )
  },

  Callout: (props: any) => {
    return (
      <div className='not-prose my-5 rounded bg-blue-200 p-7 dark:bg-blue-700'>
        <Info className='mb-3' />
        <p>{props?.children}</p>
      </div>
    )
  },
}

function copyToClipboard(children: string | null | undefined): void {
  window.navigator.clipboard.writeText(children || '')
}

export default DocsMDXcomponents
