import { useTranslation,Trans } from "next-i18next";
import {useEffect, useState, useReducer, Dispatch, useRef} from "react";
import Head from "next/head";
import setStaticProps from "../util/setStaticProps";
import TodoItem, { ToDoItemInterface,ToDoItemAction, ToDoItemData} from "../component/todoItem"

function ToDoItemReducer(
        state:{
            list:ToDoItemData[]
        },
        action:ToDoItemAction
    ):{
        list:ToDoItemData[]
    } {
    switch(action.type){
        case "addNewItem":
            return {list:[...state.list,{
                content:"", title: "", isEditMode:true,
                index:state.list.length,newItem:true} as ToDoItemInterface]}
        case "completeItem":
            if (action.payload && typeof action.payload.index == "number"){
                const list = [...state.list];
                list[action.payload.index].completed = action.payload.completed;
                return {list};
            }
            return state;
        case "modifyItem":
            if (action.payload && typeof action.payload.index == "number" ){
                const list = [...state.list];
                if(list[action.payload.index]){
                    list[action.payload.index].isEditMode = true;
                    return {list};
                }
                return state;
            }
            return state;
        case "saveItem":
            if (action.payload && typeof action.payload.index == "number"){
                const list = [...state.list];
                list[action.payload.index].content = action.payload.content;
                list[action.payload.index].title = action.payload.title;
                list[action.payload.index].isEditMode = action.payload.isEditMode;
                list[action.payload.index].startDate = action.payload.startDate;
                list[action.payload.index].endDate = action.payload.endDate;
                list[action.payload.index].newItem = false;
                list[action.payload.index].noTimeLimit = action.payload.noTimeLimit;
                return { list };
            }
            return state;
        case "deleteItem":
            if (action.payload && typeof action.payload.index == "number"){
                const list = [...state.list].filter((_,i)=>i!==action?.payload?.index as number)
                return { list };
            }
            return state;
        case "loadFromLocal":
            if(action.payload.list){
                return {list:action.payload.list}
            }
            return state;
        default:
            return state;
    }
    
}
export default function ToDo(){
    const [didMount,doMount] = useState<boolean>(false);
    const {t} = useTranslation("todo");
    const [todos,dispatchTodo] = useReducer(ToDoItemReducer,{list:[]});
    const itemRefs = useRef<(HTMLElement|null)[]>([]);
    const btnAddNewRef = useRef<HTMLButtonElement>(null);
    let timeout:any;

    useEffect(()=>{
        const savedList:()=>Omit<ToDoItemInterface,"refs"|"dispatch"|"emptyRef">[] = ()=>JSON.parse(localStorage.getItem("todolist") ?? "[]");
        if(savedList().length != 0 && !didMount) {
            dispatchTodo({type:"loadFromLocal",payload:{
                list:savedList().filter(s=>!s.isEditMode),
            }});
            doMount(true);
        }

        // deleted or added
        if( todos.list.length > savedList.length ) {
            localStorage.setItem("todolist",JSON.stringify(todos.list.filter(s=>!s.isEditMode)));
        }
        
        if(todos.list.length < savedList.length || todos.list.length == 0) {

            localStorage.setItem("todolist",JSON.stringify(todos.list.filter(s=>!s.isEditMode)));
            if(todos.list.length == 0 && didMount) {
                timeout = setTimeout(()=>{
                    clearTimeout(timeout);
                    btnAddNewRef.current?.focus();
                },50)
            }
        }
        
    },[todos])

    return (
        <>
        <Head>
           <title>{`${t("title")} - ${t("common:title")}`}</title>
        </Head>
        <h2>{t("main_title")}</h2>
        <div className={`todoList`}>
            {todos.list.length > 0 ? todos.list.map((todo,idx)=>{
                return <TodoItem ref={(ref)=>{
                    itemRefs.current[idx] = ref;
                }} key={idx}
                content={todo.content ?? t("template.temporaryContent")}
                title={todo.title ?? t("template.temporaryTitle")}
                isEditMode={todo.isEditMode!}
                newItem = {todo.newItem!}
                index={idx} dispatch={dispatchTodo} 
                startDate={todo.startDate} endDate={todo.endDate}
                noTimeLimit = {todo.noTimeLimit ?? true}
                completed={todo.completed}
                refs={itemRefs} emptyRef={btnAddNewRef}></TodoItem>
            }) : <div>
                <p>{t("staticText.noTodo")}</p>
            </div>}
        </div>
        <button ref={btnAddNewRef} onClick={()=>{
            dispatchTodo({type:"addNewItem",payload:{}});
        }}>{t("label.button.add")}</button>
        </>
    )
}
export const getStaticProps = setStaticProps(["common","todo"])