import "server-only";
import { PrismaClient } from "@prisma/client";
import MyButton from "./myButton";
import HomeClient from "./homeClient";
interface Props {
  data: string;
}
export default async function myServerComp(props: any) {
  //console.log("+++++++++++++++++++++   MSC ", props.data)

  //const response = await fetch("...");
  //const data = await response.json();MSC
  const prisma = new PrismaClient();

  //async function main() {
  // ... you will write your Prisma Client queries here
  //const allUsers = await prisma.users.findMany();

  // // await prisma.users.create({
  // // 	data: {
  // // 		full_name: "Test User",
  // // 		email: "alice...prisma.io",
  // // 		created_at: new Date().toISOString(),
  // // 		updated_at: new Date().toISOString(),
  // // 	},
  // // })

  //}

  // main()
  // 	.then(async () => {
  // 		await prisma.$disconnect()
  // 	})
  // 	.catch(async (e) => {
  // 		console.error(e)
  // 		await prisma.$disconnect()
  // 		process.exit(1)
  // 	})

  const allStories = await prisma.stories.findMany({
    orderBy: [
      {
        created_at: "desc",
      },
    ],
    select: {
      id: true,
      title: true,
      created_at: true,
      urls: true,
      slug: true,
      alt: true,
    },
  });

  //console.log("ALLSTORIES==================", allStories)

  return (
    <>
      <HomeClient allStories={allStories} />
    </>
  );
}
