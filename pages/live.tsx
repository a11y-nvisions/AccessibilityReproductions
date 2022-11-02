import Head from "next/head";
import { useEffect, useState } from "react";
import Axios from 'axios';

export default function LiveTimer(){
  const [[getH,setH],[getM,setM],[getS,setS]] = [useState(""),useState(""),useState("")];
  useEffect(()=>{
    const inaccessibleClock = document.querySelector('.inaccessible');
    setInterval(()=>{
      Axios.get("/api/timer").then(body=>{
        setH(body.data.h)
        setM(body.data.m)
        setS(body.data.s)
        if(inaccessibleClock){
          inaccessibleClock.innerHTML = `
            <span class="hour">${body.data.h}</span>:<span class="min">${body.data.m}</span>:<span class="sec">${body.data.s}</span>
          `
        }
      })
    },100)
  },[setH,setM,setS])

  return (
    <>
      <Head>
        <title>Refreshing element problem with iOS VoiceOver - Accessibility Reproductions</title>
      </Head>
      
      <h2>Refreshing element problem with iOS VoiceOver</h2>
      <p>We can find Live Regions easily like Timers, Counters, and Clocks and D-Day while exploring webpages. Sometimes, these make troubles with iOS VoiceOver exploring.</p>
      <h3>Experience yourself</h3>
      <p>Try pass below using an swipe navigation gesture of VoiceOver on iPhone and iPad. You won&apos;t be able to pass there.</p>
      <span className="inaccessible"></span>
      <p>And the next clock section is passable with VoiceOver.</p>
      <span>
        <span className="accessible"><span className="hours">{getH}</span>:<span className="minutes">{getM}</span>:<span className="seconds">{getS}</span></span>
      </span>
      <h3>Conclusion</h3>
      <p>It&apos;s surprising. What are you think why can VoiceOver navigate and pass this? Between a fisrt clock and the last clock, there&apos;s one difference.
        That difference is how to update data.</p>
      <p>The last clock only updates text nodes that are inside of the element.
        It means this clock doesn&apos;t replace a whole element with a new element for updating new data.
        When navigating with a swipe, iOS VoiceOver cannot explore elements that have been added and removed quickly, and, VoiceOver will recognize a last-navigated element as the last element of the current screen like a fool. LOL.</p>
      <p>Do not replace whole elements for updating data. When updating data, please update a text inside the element only for making a stable user experience for your websites and web applications.</p>
    </>
  );
}