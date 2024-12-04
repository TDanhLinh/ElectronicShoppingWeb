// pages/terms-of-sale.js
import Head from 'next/head';
import { TermsOfSale } from '../src/terms-of-sale/termsofsale';

export default function TermsOfSalePage() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Điều khoản mua hàng</title>
                <link rel="stylesheet" href="/assets/css/terms-of-sale.css" />
            </Head>
            <TermsOfSale />
        </>
    );
}
