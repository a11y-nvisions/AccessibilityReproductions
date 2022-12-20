import Document, { Head, Html, Main, NextScript } from "next/document";

export default class Doc extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <div id="dialogs"></div>
          <NextScript />
        </body>
      </Html>
    )
  }
}