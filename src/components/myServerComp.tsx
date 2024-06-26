import "server-only";
import { PrismaClient } from "@prisma/client";
interface Props {
  data: string;
}
export default async function myServerComp(props: Props) {
  console.log("+++++++++++++++++++++   MSC ", props.data);

  //const response = await fetch("...");
  //const data = await response.json();MSC
  const prisma = new PrismaClient();

  async function main() {
    // ... you will write your Prisma Client queries here
    //const allUsers = await prisma.users.findMany();

    await prisma.users.create({
      data: {
        full_name: "Test User",
        email: "alice...*risma.io",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });

    const allUsers = await prisma.users.findMany();
    console.log(allUsers);
  }
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  return <h1>wwwwwwwwwwww</h1>;
}
