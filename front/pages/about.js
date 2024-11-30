// pages/about.js
import Head from 'next/head';
import { About } from '../src/about/About';

export default function AboutPage() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Giới thiệu</title>
                <link rel="stylesheet" href="/assets/css/about.css" />
            </Head>
            <About />
        </>
    );
}
