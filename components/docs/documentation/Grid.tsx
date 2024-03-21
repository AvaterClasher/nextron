import clsx from 'clsx'
import Link from 'next/link'

const Grid: React.FC<{
  features: {
    color?: string
    customColor?: string
    title?: string
    description?: string
    link?: string
  }[]
}> = ({ features }) => {
  return (
    <div className='not-prose grid gap-5 !text-black md:grid-cols-2'>
      {features.map(({ color, title, description, customColor, link }, i) => (
        <Link key={i} href={link || '#'}>
          <a className='block'>
            <div
              className={clsx(
                'h-full rounded-lg px-4 py-6 shadow-md transition-all duration-75 hover:scale-[1.02]',
                color === 'blue' && 'bg-blue-400',
                color === 'cyan' && 'bg-cyan-400',
                color === 'green' && 'bg-green-400',
                color === 'red' && 'bg-red-400',
                color === 'yellow' && 'bg-yellow-400',
                color === 'purple' && 'bg-purple-400',
                color === 'teal' && 'bg-teal-400',
                color === 'orange' && 'bg-orange-400',
                color === 'gray' && 'bg-gray-400'
              )}
              style={{
                backgroundColor: customColor && customColor,
              }}>
              <h3 className='mb-4 text-2xl font-bold'>{title}</h3>
              <p className='text-base'>{description}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Grid
