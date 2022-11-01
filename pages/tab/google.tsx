import { ReactNode } from "react";
import RoutingTabLayout from "./_layout";

function content_google () {
  return (
    <>
    <p>Google is a name of search enine, service, and company. Google is my favorite search engine!</p>
    </>
  )
}

content_google.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default content_google;