import { Tooltip as TooltipComponent } from 'react-tiny-tooltip'

const Tooltip = (props: any) => {
  return (
    <p className='inline-block cursor-help underline decoration-blue-400 decoration-wavy'>
      <TooltipComponent {...props}>{props.children}</TooltipComponent>
    </p>
  )
}

export default Tooltip
