// pages/payment.js
import Head from "next/head";
import { Payment } from "../src/checkout/payment";

export default function payment() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Thanh toán</title>
                <link rel="stylesheet" href="/assets/css/payment.css" />
            </Head>
            <Payment />
        </>
    );
}
