import Head from "next/head"
import { Status } from "../src/status/Status"

export default function login() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Kiểm tra thanh toán"
                />

                <link rel="stylesheet" href="/assets/css/under-dev.css" />
                <link rel="icon" href="/favicon.png" />
                
                <title>Bán hàng yêu thương</title>
            </Head>
            <Status />
        </>
    )
}

