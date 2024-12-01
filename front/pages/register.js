import Head from "next/head"
import { Register } from "../src/sign-in-sign-up/Register"

export default function login() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Đăng ký"
                />

                <link rel="stylesheet" href="/assets/css/register.css" />
                <link rel="icon" href="/favicon.png" />

                <title>Đăng Ký</title>
            </Head>
            <Register />
        </>
    )
}

