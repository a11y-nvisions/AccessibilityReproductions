import Head from "next/head";
import { useTranslation } from "next-i18next";
import setStaticProps from "../util/setStaticProps";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import Menu, { MenuItemInit } from "../component/menus";

export default function Menus(){
    const {t} = useTranslation("menus")
    const router = useRouter()
    const [title,setTitle] = useState<string>("")

    
    useEffect(()=>{
        setTimeout(()=>{
            setTitle(`${t("title")} - ${t("common:title")}`)
            const announcer=document.querySelector("next-route-announcer p");
            if (announcer) announcer.innerHTML = title
        },2000)
    },[title])
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <Menu data={[
                    new MenuItemInit<"execute">({label:"A Item",onClick:()=>{}}),
                    new MenuItemInit<"execute">({label:"B Item",onClick:()=>{}}),
                    new MenuItemInit<"submenu">({label:"C Item",submenu:{data:[
                        new MenuItemInit({label:"가 항목"}),
                        new MenuItemInit({label:"나 항목"}),
                        new MenuItemInit<"submenu">({label:"다 항목",submenu:{data:[
                            new MenuItemInit({label:"다식"}),
                            new MenuItemInit({label:"다과"}),
                            new MenuItemInit({label:"다도"})
                        ]}})
                    ]}}),
                    new MenuItemInit<"execute">({label:"D Item",onClick:()=>{}})
            ]}></Menu>
            </article>
        </>
    )
}

export const getStaticProps = setStaticProps(["common","menus"]);