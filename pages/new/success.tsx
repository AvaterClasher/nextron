import DashboardNav from '@/components/DashboardNav'
import { Heading1, Heading2, Heading3 } from '@/components/ui/Typography'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { usePrefetch } from 'use-link-prefetch'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import { CustomLink } from '@/components/ui/Link'

const SuccessPage = () => {
  const router = usePrefetch([])
  usePrefetch([`/dashboard/${router.query.siteId}`])

  useEffect(() => {
    var count = 200
    var defaults = {
      origin: { y: 0.7 },
    }

    function fire(
      particleRatio: number,
      opts: {
        spread: number
        startVelocity?: number
        decay?: number
        scalar?: number
      }
    ) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      )
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [])

  return (
    <ProtectedRoute>
      <DashboardNav />
      <div className='mx-auto max-w-6xl px-10'>
        <div>
          <Heading1>Congratulations!!</Heading1>
          <Heading2 className='mt-5'>
            <span className='bg-gradient-to-r from-[#1dbde6] to-[#f1515e] bg-clip-text text-transparent'>
              {'`' + router.query.siteName + '`' || 'Your site'} has been
              created
            </span>
          </Heading2>

          <div className='mt-10'>
            <div>
              <CustomLink
                href={`/dashboard/${router.query.siteId}`}
                className='inline-block'
              >
                View dashboard
              </CustomLink>
            </div>
          </div>
        </div>
        <div className='mt-20'>
          <Heading3>How to proceed further?</Heading3>
          {/* // TODO: add link to docs */}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default SuccessPage
