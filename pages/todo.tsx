import { useTranslation } from "next-i18next";
import {useEffect, useState} from "react";
import Head from "next/head";
import setStaticProps from "../util/setStaticProps";
import TodoItem, { ToDoItemInterface } from "../component/todoItem";

export default function ToDo(){
    
    const {t} = useTranslation("todo");
    const [todos,setTodos] = useState<ToDoItemInterface[]>([]);
    useEffect( ()=>{
        if(!localStorage.getItem("todolist") || JSON.stringify(localStorage.getItem("todolist") ?? "[]").length === 0){
            localStorage.setItem("todolist",JSON.stringify(todos))
        }
        if(localStorage.getItem("todolist") && ( JSON.parse(localStorage.getItem('todolist') ?? "[]") as ToDoItemInterface[]).length > 0 ) {
            setTodos(JSON.parse(localStorage.getItem("todolist") ?? "[]") ?? []);
        }
        
    },[todos,setTodos]);
    return (
        <>
        <Head>
        <title>{`${t("title")} - ${t("common:title")}`}</title>
        </Head>
        <h2>{t("main_title")}</h2>
        <div className="todoList">
            {todos.length > 0 ? todos.map(todo=>{
                return <TodoItem {...todo}></TodoItem>
            }) : <div>
                <p role="alert">할일이 등록되어있지 않습니다.</p>
                <button onClick={()=>{
                    
                }}>일정 등록하기</button>
            </div>}
        </div>
        </>
    )
}
export const getStaticProps = setStaticProps(["common","todo"])