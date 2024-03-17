import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <>
      <input
        {...props}
        className={clsx(
          'relative -bottom-[1px] m-px rounded border border-slate-400 px-5 py-[9px] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500',
          props?.className
        )}
      />
    </>
  )
}