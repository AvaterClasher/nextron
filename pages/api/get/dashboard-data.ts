import requireSession from '@/lib/require-session'
import prisma from '@/utils/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'types/types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const userId = user.id

  const site = await prisma.site.findMany({
    where: {
      createdBy: userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  res.json(site)
}

export default requireSession(handler)
