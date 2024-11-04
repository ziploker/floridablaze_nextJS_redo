"use client";
//interface Props {
// openSideMenu: string
// setOpenSideMenu: (word: string) => void
//}

interface Props extends React.PropsWithChildren {}

export default function HomeHeaderWrapper({ children }: Props): JSX.Element {
  console.log("=================================== Hom,eHeaderWrapppper");
  return <>{children}</>;
}
