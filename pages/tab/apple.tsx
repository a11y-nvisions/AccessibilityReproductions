import { ReactNode } from "react";
import RoutingTabLayout from "./_layout";

function Content_apple () {
  return (
    <>
    <p>Apple is a name of delicious fruit! And Also it&apos;s a name of company that famous for iPhone!</p>
    </>
  )
}

Content_apple.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default Content_apple;