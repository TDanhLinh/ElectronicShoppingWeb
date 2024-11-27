import { useRouter } from 'next/router';
import Head from "next/head"

import { ProductID } from "../../src/product-id/ProductID"

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content='Chi tiết sản phẩm'
                />

                <link rel="stylesheet" href="/assets/css/base.css" />
                <link rel="stylesheet" href="/assets/css/grid.css" />
                <link rel="stylesheet" href="/assets/css/main.css" />
                <link rel="stylesheet" href="/assets/css/product-detail.css" />
                <link rel="icon" href="/favicon.png" />

                <title>Bán hàng yêu thương</title>
            </Head>
            <ProductID
                id = {id}
            />
        </>
    );
};