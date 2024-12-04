// pages/how-to-buy.js
import Head from 'next/head';
import { HowToBuy } from '../src/how-to-buy/howtobuy';

export default function HowToBuyPage() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Hướng dẫn mua hàng</title>
                <link rel="stylesheet" href="/assets/css/howtobuy.css" />
            </Head>
            <HowToBuy />
        </>
    );
}
