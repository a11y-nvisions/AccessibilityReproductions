interface PageRegisterInit {
  path:string,
  label?:string,
};


const RegisteredPages:PageRegisterInit[] = [
  {
    path:"/",label: "menu.home",
  },
  {
    path:"/inert-accordion", label: "menu.accordion",
  },
  {
    path:"/tab-layout", label: "menu.aria_tab",
  },
  {
    path:"/tab/", label: "menu.routing_tab",
  },
  {
    path:"/live", label: "menu.real-time_clock",
  }
]

export default RegisteredPages;