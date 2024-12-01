import Head from "next/head"
import { ForgotPassword } from "../src/sign-in-sign-up/ForgotPassword"

export default function login() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Quên mật khẩu"
                />

                <link rel="stylesheet" href="/assets/css/forgotpassword.css" />
                <link rel="icon" href="/favicon.png" />

                <title>Quên mật khẩu</title>
            </Head>
            <ForgotPassword />
        </>
    )
}

