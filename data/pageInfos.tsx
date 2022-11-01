interface PageRegisterInit {
  path:string,
  label?:string,
};


const RegisteredPages:PageRegisterInit[] = [
  {
    path:"/",label: "Home",
  },
  {
    path:"/inert-accordion", label: "Make an accordion with smooth animation using inert",
  },
  {
    path:"/tab-layout", label: "The tab layout",
  },
  {
    path:"/routing-tab-layout/apple", label: "The tab-layout with routing",
  }
]

export default RegisteredPages;