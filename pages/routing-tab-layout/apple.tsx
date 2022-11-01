import { ReactNode } from "react";
import { Apos } from "../../component/punc";
import RoutingTabLayout from "./_tabLayout";

function apple () {
  return <p>Apple is a name of delicious fruit! And Also it&apos;s a name of company that famous for iPhone!</p>
}
apple.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default apple