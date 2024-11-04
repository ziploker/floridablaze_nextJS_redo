import "server-only";

import { getSession } from "../../lib";

import HeaderClient from "./headerClient";

export default async function header(props: any) {
  const session = await getSession();
  console.log("NEW SESSION CHECK", session);
  return (
    <>
      <HeaderClient session={session} />
    </>
  );
}
