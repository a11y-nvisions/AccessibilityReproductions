interface PageRegisterInit {
  path:string,
  label?:string,
};


const RegisteredPages:PageRegisterInit[] = [
  {
    path:"/",label: "Home",
  },
  {
    path:"/inert-accordion", label: "How to utilize inert attrubte for animation",
  },
  {
    path:"/tab-layout", label: "WAI-ARIA Tab Example",
  },
  {
    path:"/tab/", label: "The tab-layout with routing",
  },
  {
    path:"/live", label: "Refreshing element problem with iOS VoiceOver",
  }
]

export default RegisteredPages;