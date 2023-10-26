import { EventHandler, forwardRef, SyntheticEvent, useEffect, useRef, useState, useImperativeHandle, MutableRefObject,
    useContext,
    Dispatch,
    createContext,
    SetStateAction} from "react";


type MenuItemType = "submenu"|"execute"|"checkbox"|"radio";

export interface MenuItemProps<T extends MenuItemType> {
    label:string;
    submenu?:T extends "submenu" ? MenuProps : undefined;
    defaultChecked?:T extends "checkbox" ? boolean : undefined;
    defaultCheckedRadio?:T extends "radio" ? number : undefined;
    onClick?:T extends "execute" ? EventHandler<SyntheticEvent> : undefined;
}
export class MenuItemInit<T extends MenuItemType> implements MenuItemProps<T> {
    public label:string="";
    public submenu?:T extends "submenu" ? MenuProps : undefined;
    public defaultChecked?:T extends "checkbox" ? boolean : undefined;
    public defaultCheckedRadio?:T extends "radio" ? number : undefined;
    public onClick?:T extends "execute" ? EventHandler<SyntheticEvent> : undefined;
    constructor({label,defaultChecked,defaultCheckedRadio,onClick,submenu}:MenuItemProps<T>){
        [this.label,this.defaultChecked,this.defaultCheckedRadio,this.submenu,this.onClick] = 
        [label,defaultChecked,defaultCheckedRadio,submenu,onClick];
    }
}
export interface MenuProps {
    data:[MenuItemProps<MenuItemType>,...MenuItemProps<MenuItemType>[]]
}

const Menu = (props:MenuProps&{exitRef?:MutableRefObject<HTMLElement|null>}) => {
    const [isSubmenu,submenu] = useState(false);
    const [navigation,setNavigation] = useState<number>(0);
    const [expanded,setExpanded] = useState<number|null>(null);
    const [isNavigationRequested,navigattionRequested] = useState<boolean>(false);
    const navigationRef = useRef<HTMLLIElement|null>(null);
    const {data,exitRef} = props;

    useEffect(()=>{
        if(isNavigationRequested){
            navigationRef.current?.focus();
        }
        if(isSubmenu) {
            navigationRef.current?.focus();
        }
    },[isNavigationRequested,navigation,isSubmenu])
    return (
        <ul className={`menu vertical`} ref={(ref)=>{
            submenu(ref?.parentElement?.tagName.toLowerCase() == "li")
        }}>
            {data.map((item,idx)=>
                <li key={idx} ref={idx == navigation ? navigationRef : undefined} role={"menuitem"} tabIndex={navigation == idx ? 0 : -1}
                aria-expanded={item.submenu ? expanded == idx : undefined}
                onKeyDown={(evt)=>{
                    const {code} = evt.nativeEvent;
                    let navigationRequest:ReturnType<typeof setTimeout>;
                    switch(code){
                        case "ArrowDown": // Next Item
                            evt.stopPropagation();
                            setNavigation(idx+1 < data.length ? idx+1 : 0);
                            navigattionRequested(true);
                            navigationRequest=setTimeout(()=>{clearTimeout(navigationRequest)},100);
                            break
                        case "ArrowUp": // Previous Item
                            evt.stopPropagation();
                            setNavigation(idx-1 >= 0 ? idx-1 : data.length-1);
                            navigattionRequested(true);
                            break
                        case "Escape":
                            evt.stopPropagation();
                            exitRef?.current?.focus();
                            if(isSubmenu){
                                exitRef?.current?.dispatchEvent(new KeyboardEvent("keydown",{code:"Escape"}));
                                console.log(exitRef)
                            }
                            setExpanded(-1);
                            break;
                        case "Enter":
                            if(item.submenu){
                                setExpanded(idx);
                            }
                            evt.stopPropagation();
                            break;
                    }
                }}
                onMouseOver={()=>{
                    if(item.submenu){
                        setExpanded(idx);
                    } else {
                        setExpanded(null);
                    }
                }}
                onClick={item.onClick ? item.onClick : ()=>{
                    if(item.submenu) {
                        setExpanded(idx);
                    }
                }}>
                {item.label}
                {(item.submenu && expanded == idx) ? <Menu data={item.submenu.data} exitRef={navigationRef} /> : <></>}
                </li>
            )}
        </ul>
    )
}

export default Menu;