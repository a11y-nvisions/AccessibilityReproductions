import Head from 'next/head';
import React, { FC } from 'react';
import { SQuote } from '../component/punc';
import Summarizable from '../component/summarizable';

const Page_Accordion:FC<{[key:string]:any}> = ({title})=> {
  return (
    <>
      <Head>
        <title>How to utilize inert attrubte for animation - Accessibility Reproductions</title>
      </Head>
      <article>
        <h2>How to utilize inert attribute for animation</h2>
        <p>This reproduce is for easy implementation method of <SQuote>on appear</SQuote>, <SQuote>on disappear</SQuote> animation with using <SQuote>inert</SQuote> attribute in the web.</p>
        <section>
          <h3>Background</h3>
          <p>
            CSS Properties, <SQuote>display:none;</SQuote> or <SQuote>visibility:hidden</SQuote> is not a good at providing an animation effect. As you know, in these cases, Web element can&apos;t be show the most animations smoothy.
            In the near past, to give them animation effects when appears or disappears, We had to use a DOM events that a very complex.
            However, recently &lt;dialog&gt; tag and <SQuote>inert</SQuote> attribute have started to supporting most browsers.
            Expecially, <SQuote>inert</SQuote> attribute is a very good alternative when create components that hide or show contents with animation.
          </p>
          <p>
            For example, I&apos;ve make element and then set it <SQuote>overflow:hidden</SQuote> and <SQuote>min-height 0.15s;</SQuote>,
            min-height to 0 pixel when hiding contents,
            min-height to specific size value when appearing contents,
            and when it&apos;s hidden. and last, I&apos;ve set an <SQuote>inert</SQuote> attribute for accessibility.
          </p>
          <p>
            Developers have been making elements like this for a long time ago. but, their elements were accessible even if it&apos;s hidden. that was a big problem.
            So, accessibility engineers have been trying to fix them. they had been giving container <SQuote>aria-hidden=true</SQuote> and giving items <SQuote>tabindex=0</SQuote> for solving this issue.
            Now, we are no more need to do these, because of <SQuote>inert</SQuote> attribute.
          </p>
        </section>
        <section id='core'>
          <div>
            <h5>Example</h5>
            <p>
              The below button is a result of this example for Bug behavior reproduction.
            </p>
            <Summarizable buttonLabel={"Hello World Sample"} containerTag='section' headingLevel={2} useNativeHeading={false}>
              <p>Hello, World!</p>
            </Summarizable>
          </div>
        </section>
      </article>
    </>
  );
}

export default Page_Accordion;