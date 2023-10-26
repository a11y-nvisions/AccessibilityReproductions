import {MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";

import DOMPurify from "dompurify";

import IdentifierSerialGenerater from "../util/Identifier";

export interface ToDoItemInterface {
    title:string;
    content:string;
    isEditMode:boolean
    setEditMode:SetStateAction<boolean>
}

export default function TodoItem({content,title,isEditMode,setEditMode}:ToDoItemInterface){
    const id = IdentifierSerialGenerater();
    const titleRef = useRef<HTMLHeadingElement|null>(null);
    useEffect(()=>{
        if(isEditMode){
            titleRef.current?.focus();
        }
    },[isEditMode,titleRef]);


    return (
        <article id={`article_${id}`}>
            <div><h3 id={`title_${id}`} ref={titleRef} contentEditable={isEditMode}>{title}</h3></div>
            <div id={`content_${id}`} dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(content)}}></div>
        </article>
    )
}