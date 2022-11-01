import React, {useState,ReactElement,FC} from "react";
import {IntRange} from '../util/type';
type HeadingLevelRange = IntRange<0,7>;
type containerTag = `${"div"|"section"|"aside"|"article"|"ul"|"ol"}`

type SummarizableInit = {
  buttonLabel:ReactElement|string,
  children:ReactElement,
  useNativeHeading?:boolean
  headingLevel?:HeadingLevelRange,
  containerTag?:containerTag,
  fallback?:boolean,
}

const Summarizable:FC<SummarizableInit> = ({ buttonLabel, children, useNativeHeading, headingLevel, containerTag,fallback}) => {
  const [isExpanded, setExpanded] = useState(false);
  const action_click = ()=> { 
    setExpanded(!isExpanded) 
  }
  const VariableHeading:keyof JSX.IntrinsicElements|null = useNativeHeading ? (0 < headingLevel! ? `h${headingLevel! ? headingLevel! : 1}` : 'div') : "div";
  const VariableContainer:keyof JSX.IntrinsicElements = `${containerTag!}`;

  return (
    <VariableContainer className={`summarizable ${fallback ? " use-fallback" : ""}`}>
      <VariableHeading className="section_title" role={!useNativeHeading && headingLevel! > 0 ? "heading" : undefined} aria-level={!useNativeHeading && headingLevel! > 0 ? headingLevel : undefined}>
        <button aria-expanded={`${isExpanded}`} onClick = {action_click}>
          <span className="title-text">{buttonLabel}</span>
        <i aria-hidden={true} className={`state-icon fa-solid ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"}`}></i></button>
      </VariableHeading>
      <div ref={node => {if (!fallback) {node?.toggleAttribute("inert",!isExpanded);}}} className={`detail-wrapper${isExpanded ? " show" : ""}`}>
        <div className="scroll-wrap">
          {children}
        </div>
      </div>
    </VariableContainer>
  );
}
Summarizable.defaultProps = {
  buttonLabel:<>Default Text</>,
  children : <>This is a section details</>,
  useNativeHeading:true,
  headingLevel : 0,
  containerTag : "div",
  fallback : false
}
export default Summarizable;