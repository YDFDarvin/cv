import App from 'next/app'
import Head from 'next/head'

import "../styles/index.scss"

const hoverName = "_hover"
export default class MyApp extends App {
  hoverAgent({target: {dataset: {hover}}}: {target: HTMLElement}) {
    const previous = document.body.getElementsByClassName(hoverName)
    , {length} = previous

    for (let i = length; i--;)
      previous[i].classList.remove(hoverName)

    if (!hover)
      return
    
    document.body.querySelectorAll(`[data-hover='${hover}']`)
    .forEach(({classList}) => classList.add(hoverName))
  }
  componentDidMount() {
    //@ts-expect-error
    document.body.addEventListener("mouseover", this.hoverAgent)
  }
  componentWillUnmount() {
    //@ts-expect-error
    document.body.removeEventListener("mouseover", this.hoverAgent)
  }

  render() {
    const { Component, pageProps} = this.props

    return <>
    <Head>
      <meta charSet="utf-8"/>
      <meta
        name="viewport"
        // eslint-disable-next-line max-len
        content="initial-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
      />               
    </Head>
    <Component {...pageProps} />
  </>
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

