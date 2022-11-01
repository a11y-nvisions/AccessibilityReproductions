import Document, {Head,Html,Main, NextScript,DocumentContext} from "next/document";

export default class Docs extends Document {
  static async getInitialProps(ctx:DocumentContext){
    const initProps = await Document.getInitialProps(ctx);
    return {...initProps};
  }

  render(){
    return (
    <Html lang="en">
      <Head />
      <body>
          <Main />
          <NextScript />
      </body>
    </Html>
    )
  }
}