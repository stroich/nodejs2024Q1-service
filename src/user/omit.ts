import { User } from 'src/database/type';

export function omitPassword(user: User): Omit<User, 'password'> {
  return {
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
