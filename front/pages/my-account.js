import React from "react";
import { MyAccount } from "../src/my-account/MyAccount";
import Head from "next/head";

export default function home() {
    return (
        <React.StrictMode>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="web bán hàng sử dụng nextjs"
                />

                <link rel="stylesheet" href="/assets/css/base.css" />
                <link rel="stylesheet" href="/assets/css/grid.css" />
                <link rel="stylesheet" href="/assets/css/main.css" />
                
                <link rel="icon" href="/favicon.png" />

                <title>Tài khoản của bạn</title>
            </Head>
            <MyAccount />
        </React.StrictMode>
    )
}