import { useRef } from 'react'
import clsx from 'clsx'
import * as FeatherIcons from 'react-feather'
import Callout from './Callout'
import Tooltip from './Tooltip'
import { Accordion } from './Accordion'
import { Sandpack } from '@codesandbox/sandpack-react'
import '@codesandbox/sandpack-react/dist/index.css'

const DocsMDXcomponents = {
  pre: (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useRef<HTMLPreElement>(null)

    return (
      <pre ref={ref} {...props} className='relative'>
        <button
          className='absolute right-3 top-2 inline-block'
          onClick={() => copyToClipboard(ref.current?.textContent)}>
          <FeatherIcons.Clipboard className='h-6 w-6 text-slate-400 transition-all hover:scale-105 hover:text-slate-50' />
        </button>
        {props?.children}
      </pre>
    )
  },

  Callout: Callout,
  Tooltip: Tooltip,
  Icons: FeatherIcons,
  Accordion: Accordion,
  Sandpack: Sandpack,
}

function copyToClipboard(children: string | null | undefined): void {
  window.navigator.clipboard.writeText(children || '')
}

export default DocsMDXcomponents
