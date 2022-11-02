import Head from "next/head";
import {FC} from "react";
import TabLayout,{TabContentInfo} from "../component/TabLayout";

const Page_TabLayout:FC<{[key:string]:any}> = () =>{
  const info:TabContentInfo[] = [
    {label:"Apple",panel:<p>Apple is a name of delicious fruit! And Also it&apos;s a name of company that famous for iPhone!</p>},
    {label:"Google",panel:<p>Google is a name of search enine, service, and company. Google is my favorite search engine!</p>}
  ];
  return (
    <>
    <Head>
      <title>Example for WAI-ARIA Tab - Accessibility Reproductions</title>
    </Head>
    <h2>WAI-ARIA Tab Element</h2>
    <p>Below Content is Tabs that applied WAI-ARIA for Assistive Technologies.</p>
    <TabLayout defaultSelected={0} tabControlInfo={info} />
    </>
  )
}
export default Page_TabLayout;