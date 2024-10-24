import Head from "next/head"
import { Login } from "../src/sign-in-sign-up/Login"

export default function login() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Đăng nhập"
                />

                <link rel="stylesheet" href="/assets/css/login.css" />

                <link rel="icon" href="/favicon.png" />

                <title>Đăng nhập</title>
            </Head>
            <Login />
        </>
    )
}

