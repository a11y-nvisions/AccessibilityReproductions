import { ReactNode } from "react";
import RoutingTabLayout, {} from "./_tabLayout";

function google (){
  return <p>Google is a name of search enine, service, and company. Google is my favorite search engine!</p>;
}
google.getLayout = (page:ReactNode)=> <RoutingTabLayout>{page}</RoutingTabLayout>

export default google;