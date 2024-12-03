import React from "react";
import Head from "next/head";
import {Seller} from "../src/admin/Seller";

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
                <link rel="stylesheet" href="/assets/css/seller.css" />

                <link rel="icon" href="/favicon.png" />

                <title>Quản lý</title>
            </Head>
            <Seller />
        </React.StrictMode>
    )
}