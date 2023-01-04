// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CommentBody } from '../../typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const comment: CommentBody = JSON.parse(req.body)

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'comment',
          text: comment.text,
          username: comment.username,
          profileImg: comment.profileImg,
          image: comment.image,
          tweet: {
            _type: 'reference',
            _ref: comment.tweetId,
          },
        },
      },
    ],
  }

  const apiEndpoint = `https://3n1slelw.api.sanity.io/v2021-06-07/data/mutate/production`

  const result = await fetch(apiEndpoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer sk5S1UnF2dXu745HskPCTG0kMRPOX0xetpEgiPcYPARwClHIdQz98roZaonUbGmi86Jq6ssQCVwEPN6iei8uMqV5n4NkIWTNUDjp0wFkN1x2zi831HLow7gDtbWLi2HmelymUkTlGb4DWQzwSRo1KlxgA8P0bUG5xfM1Ad485BY5Tvn76n1D`
    },
    body: JSON.stringify(mutations),
    method: 'POST'
  })

  const json = await result.json()
  res.status(200).json({ message: 'Done!' })
}
