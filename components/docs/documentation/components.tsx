import { useRef } from 'react'
import clsx from 'clsx'
import * as FeatherIcons from 'react-feather'

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

  Callout: (props: any) => {
    return (
      <div
        className={clsx(
          'not-prose my-5 rounded p-7',
          props.color === 'blue' && 'bg-blue-400 dark:bg-blue-700',
          props.color === 'green' && 'bg-green-400 dark:bg-green-700',
          props.color === 'red' && 'bg-red-400 dark:bg-red-700',
          props.color === 'indigo' && 'bg-indigo-400 dark:bg-indigo-700',
          !props.color && 'bg-blue-400 dark:bg-blue-700'
        )}>
        <div className='mb-3'>{props?.Icon || <FeatherIcons.Info />}</div>
        <p>{props?.children}</p>
      </div>
    )
  },
  Icons: FeatherIcons,
}

function copyToClipboard(children: string | null | undefined): void {
  window.navigator.clipboard.writeText(children || '')
}

export default DocsMDXcomponents
