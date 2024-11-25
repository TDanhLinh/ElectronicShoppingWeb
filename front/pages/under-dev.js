import Head from "next/head"
import { UnderDevelopment } from "../src/under-development/underDevelopment"

export default function login() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Tính năng chưa phát triển"
                />

                <link rel="icon" href="/favicon.png" />

                <title>Sorry</title>
            </Head>
            <UnderDevelopment />
        </>
    )
}

