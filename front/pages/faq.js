// pages/faq.js
import Head from 'next/head';
import { FAQ } from '../src/faq/faq';

export default function FAQPage() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Trung tâm trợ giúp</title>
                <link rel="stylesheet" href="/assets/css/faq.css" />
            </Head>
            <FAQ />
        </>
    );
}
