import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="web bán hàng sử dụng nextjs"
                />

                <title>Bán hàng yêu thương</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
  
export default MyApp;