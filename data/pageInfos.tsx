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
  },
  {
    path:"/tabindex_container_talkback", label: "menu.talkback_tabindex_container"
  },
  {
    path:"/inert-list", label: "lst_block_by_inert"
  }
]

export default RegisteredPages;