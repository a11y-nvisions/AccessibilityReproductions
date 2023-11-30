/*global PasswordCredential a*/
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { MoreButton } from "../component/menu";
import { useState } from "react";
import setStaticProps from "../util/setStaticProps";


type DummyContact = {name:string,age:number,gender:0|1,phoneNumber:string,job:string}

export default function listWidget() {
    const { t } = useTranslation("listWidget");
    
    const [dummyData,setDummyData] = useState<DummyContact[]>([
        {name:"Tom",age:25,gender:0,job:"A11Y TE",phoneNumber:"010-0000-0001"},
        {name:"Joe",age:25,gender:0,job:"A11Y TE",phoneNumber:"010-0000-0002"},
    ]);
    
    return (
        <>
            <Head>
                <title>{`${t("title")} - ${t("common:title")}`}</title>
            </Head>
            <div className="contact">
                {dummyData.map((data,index)=>{
                    return (
                        <ContactField key={index} {...data} />
                    )
                })}
            </div>
            
        </>
    );
}


const ContactField = ({name,gender,job,phoneNumber}:DummyContact)=>{
    const [opened,setOpened] = useState<boolean>(false);
    const [focused,setFocused] = useState<number>(0);
    const {t} = useTranslation("listWidget");
    return (
        <div className={`field`}>
            <div className="key name">{t("key_name")}</div>
            <div className="value name">{name}</div>
            <div className="key gender">{t("key_gender")}</div>
            <div className="value gender">{t(`value_gender_${gender}`)}</div>
            <div className="key phone">{t("key_phone")}</div>
            <div className="value phone"><i className="fa-solid fa-phone"></i>{phoneNumber}</div>
            <div className="key job">{t("key_job")}</div>
            <div className="value job">{job}</div>
            <div className="button">
            <MoreButton 
            label={name} menu={{
                opened:opened,
                setOpened:setOpened,
                focused:focused,
                setFocused:setFocused,
            menuitem:[
                {label:t("menuitem_delete")},
                {label:t("menuitem_modify")},
            ]}}></MoreButton>               
            </div>
        </div>
    )
}
export const getStaticProps = setStaticProps(["common","listWidget"]);