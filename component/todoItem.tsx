
import {MutableRefObject, useReducer, useEffect, useRef, useState,Dispatch,forwardRef, ForwardedRef} from "react";
import IdentifierSerialGenerater from "../util/Identifier";
import { useTranslation,Trans } from "next-i18next";


export interface ToDoItemAction {type:string,payload:{list?:ToDoItemData[]}&ToDoItemData};
export interface ToDoItemInterface {
    index:number; title:string; content:string;
    startDate?:string; endDate?:string; newItem?:boolean, noTimeLimit:boolean, completed?:boolean
    isEditMode:boolean, dispatch:Dispatch<ToDoItemAction>
    emptyRef:MutableRefObject<HTMLButtonElement|null>; refs:MutableRefObject<(HTMLElement|null)[]>
}
export type ToDoItemData = Partial<Omit<ToDoItemInterface,"dispatch"|"refs"|"emptyRef">>;

const TodoItem = forwardRef<HTMLElement,ToDoItemInterface>(({
    emptyRef,refs,content,title,index,isEditMode,newItem = false, completed=false, noTimeLimit = true, dispatch,
endDate,startDate}:ToDoItemInterface,ref)=>{
    const id = IdentifierSerialGenerater();
    const titleRef = useRef<HTMLInputElement|null>(null);
    const contentRef = useRef<HTMLTextAreaElement|null>(null);
    /* const [onEditMode,setEditMode] = useState<boolean>(isEditMode); */
    const [isNewItem,setNewItem] = useState<boolean>(newItem);
    const [getTitle,setTitle] = useState(title);
    const [getContent,setContent] = useState(content);
    const [getStartDate,setStartDate] = useState(startDate ? startDate : `${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,"0")}-${String(new Date().getDate()).padStart(2,"0")}`);
    const [getEndDate,setEndDate] = useState(endDate ? endDate : `${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2,"0")}-${String(new Date().getDate()+1).padStart(2,"0")}`,);
    const [isCompleted,setCompleted] = useState<boolean>(completed);
    const [timeLimited,setTimeLimit] = useState<boolean>(noTimeLimit);
    const [isExpired,setExpired] = useState<boolean>(noTimeLimit ? false : Number(new Date(getEndDate)) <= Date.now());
    const {t} = useTranslation("todo");
    
    useEffect(()=>{
        if(isEditMode){
            titleRef.current?.focus();
        } else if ( !isEditMode && isNewItem ){
            refs.current[index]?.focus();
            setNewItem(false);
        }
    },[isEditMode]);

    const requestFunc_save = ()=>{
        if(getContent.length > 1 && getTitle.length > 0) {
                dispatch({"type":"saveItem",payload:{
                index:index,title:getTitle,content:getContent,                        
                startDate:timeLimited ? "" : getStartDate, endDate:timeLimited ? "" :  getEndDate,
                noTimeLimit:timeLimited, isEditMode:false,completed:isCompleted
            }});
        }
        setExpired( new Date(getEndDate).setHours(0,0,0,0) < new Date(Date.now()).setHours(0,0,0,0) );
    }

    const requestFunc_modify = ()=>{
        dispatch({type:"modifyItem",payload:{
            index,
            isEditMode:true,
        }})
    }

    const requestFunc_delete = ()=>{
        if(index < refs.current.length-1) {
            refs.current[index+1]?.focus();
        }
        if(index > 0) {
            refs.current[index-1]?.focus();
        }
        if(refs.current.length-1 === 0) {
            emptyRef.current?.focus();
        }
        dispatch({type:"deleteItem",payload:{
            index,
        }});
    }
    
    return (
        <article tabIndex={-1} ref={ref} id={`article_${id}`} className={`todoitem flex-row${isNewItem ? " new" : ""}${isEditMode ? " onEditing" : ""}${isExpired ? " expired" : ""}`}>
            <div className="flex-column complete">
                <input type="checkbox" 
                defaultChecked={isCompleted}
                aria-label={`${getTitle} ${getContent} ${t("label.checkbox_complete")}`} id={`complete_${id}`}
                onChange={(event)=>{
                    setCompleted(event.target.checked)
                    dispatch({type:"completeItem",payload:{
                        index,
                        completed:event.target.checked
                    }})
                }} />
            </div>
            <div className="flex-column todo-content">
                <div className="flex-row" id={`title_${id}`}>
                    <label htmlFor={`input_title_${id}`} className="key"><strong>{t("label.textbox.title")}:</strong></label>
                    <div className="value" id={`titleValue_${id}`}>
                        {isEditMode ? <input type="text" defaultValue={getTitle} onChange={(evt)=>{setTitle(evt.target.value)}} ref={titleRef} id={`input_title_${id}`} name={`input_title_${id}`} /> : <h3>{getTitle}</h3>}
                    </div>
                </div>
                <div className="flex-row" id={`content_${id}`}>
                    <label className="key" htmlFor={`input_content_${id}`}><strong>{t("label.textbox.content")}:</strong></label>
                    <div className="value" id={`contentValue_${id}`}>
                        {
                            isEditMode ? <textarea defaultValue={getContent}
                            onChange={(evt)=>{setContent(evt.target.value)}}
                            name={`input_content_${id}`}
                            id={`input_title_${id}`}
                            ref={contentRef}></textarea> : <p>{getContent}</p>
                        }
                    </div>
                </div>
                <div className="flex-row">
                    
                    { !isEditMode && 
                    <>
                    <span className="key"><strong>{t("label.staticText.term")}:</strong></span>
                    <p className="value">{!timeLimited ? `${getStartDate} ~ ${getEndDate} ${isExpired ? `(${t('staticText.expired')})` : ""}` : t("staticText.noTimeLimit")}</p>
                    </>
                    }
                </div>
                <div className="flex-row" id={`content_${id}`}>
                    { isEditMode && <label htmlFor={`noTimeLimit_${id}`}>
                        <input 
                        checked={timeLimited}
                        type="checkbox"
                        name={`noPeriod_${id}`}
                        id={`noPeriod_${id}`}
                        onChange={(evt)=>{setTimeLimit(evt.target.checked)}} />
                        {t("label.checkbox.noTimeLimit")}
                    </label>}
                    <div className="flex-column">
                        { isEditMode && 
                        <label htmlFor={`startDate_${id}`}>
                            {t("label.date.startDate")}
                            <input disabled={timeLimited} id={`startDate_${id}`} name={`startDate_${id}`} type="date" defaultValue={getStartDate}
                            onChange={(evt)=>{  
                                setStartDate(evt.target.value);
                            }} />
                        </label>
                        }
                        {isEditMode &&
                        <label htmlFor={`endDate_${id}`}>
                            {t("label.date.endDate")}
                            <input disabled={timeLimited} id={`endDate_${id}`} name={`endDate_${id}`} type="date" defaultValue={getEndDate}
                            onChange={(evt)=>{
                                setEndDate(evt.target.value);
                            }} />
                        </label>
                        }
                    </div>
                </div>
                <div className="flex-row">
                    { isEditMode && 
                    <button 
                    onClick={requestFunc_save}
                    disabled={ getTitle === "" && getContent === ""}>
                        {t("label.button.save")}
                    </button>}
                    { !isEditMode && <button 
                    onClick={requestFunc_modify}
                    aria-label={t("label.button.modify")}
                    aria-aria-describedby={`titleValue_${id} contentValue_${id}`}>
                        {t("label.button.modify")}
                    </button>}
                    <button onClick={requestFunc_delete}
                        aria-label={`${isEditMode ? t("label.button.cancel") : t("label.button.delete")}`}
                        aria-describedby={ !isEditMode ? `titleValue_${id} contentValue_${id}` : undefined }>
                        
                        {isEditMode ? t("label.button.cancel") : t("label.button.delete")}
                    </button>
                </div>
            </div>            
        </article>
)
});


export default TodoItem;