import "server-only";
interface Props {
  data: string;
}
export default async function myServerComp(props: Props): Promise<JSX.Element> {
  //const response = await fetch("...");
  //const data = await response.json();MSC
  console.log("+++++++++++++++++++++   MSC ", props.data);
  return <h1>MYSERVERCOMP {props.data}</h1>;
}
