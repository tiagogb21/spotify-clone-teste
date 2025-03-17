import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import { Request, Response } from 'express';

export async function profile(request: Request, response: Response) {
  const getUserProfile = makeGetUserProfileUseCase()

  const { user } = await getUserProfile.execute({
    userId: request.user?.sub as string,
  })

  return response.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}