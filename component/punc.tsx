import { FC, ReactElement, ReactNode } from "react";

export function SQuote ({children}:{children:ReactElement|ReactNode}) {
  return <span className="squote">{children}</span>
}
export function Quote ({children}:{children:ReactElement|ReactNode}) {
  return <span className="quote">{children}</span>
}
export function Apos () {
  return <span className="apos"></span>
}