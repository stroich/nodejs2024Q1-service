import { User } from '@prisma/client';

export function omitPassword(user: User) {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: Number(user.createdAt),
    updatedAt: Number(user.updatedAt),
  };
}
