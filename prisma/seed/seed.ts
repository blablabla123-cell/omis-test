import { PrismaPg } from '@prisma/adapter-pg';
import { env } from 'prisma/config';
import 'dotenv/config';
import { AuthenticationUtils } from '../../src/authentication/authentication.utils.js';
import { PrismaClient, UserRole } from '../../src/generated/prisma/client.js';

const connectionString = env('DATABASE_URL');
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const testAdminUser = {
  email: 'test@example.com',
  password: 'password',
  role: UserRole.ADMIN,
};

async function main() {

  const user = await prisma.user.findUnique({
    where: {
      email: testAdminUser.email,
    },
  });

  if (user) {
    return;
  }

  const utils = new AuthenticationUtils();

  await prisma.user.create({
    data: {
      ...testAdminUser,
      password: await utils.hash(testAdminUser.password),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
