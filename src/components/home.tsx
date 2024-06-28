"use client";
//interface Props {
// openSideMenu: string
// setOpenSideMenu: (word: string) => void
//}

interface Props extends React.PropsWithChildren {}

export default function Home({ children }: Props): JSX.Element {
  console.log("=================================== home");
  return <>{children}</>;
}
