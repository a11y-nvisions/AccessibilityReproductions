import React,{FC} from 'react';
import Summarizable from './summarizable';
const NoticeBar:FC<{children:React.ReactNode,title:string,noticeType?:"normal"|"warning"|"critical-warning"}> = ({children,title,noticeType})=> {
  return (<aside className={`notice-bar${` ${noticeType}`}`}>
    <Summarizable buttonLabel={title} headingLevel={0} fallback={true}>
      <>{children}</>
    </Summarizable>
  </aside>)
}

NoticeBar.defaultProps = {
  noticeType:"normal"
}

export default NoticeBar;