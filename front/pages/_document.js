import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/favicon.png" />
                    
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
                    <link rel="stylesheet" href="./assets/css/base.css" />
                    <link rel="stylesheet" href="./assets/css/main.css" />
                    <link rel="stylesheet" href="./assets/css/grid.css" />
                    <link rel="stylesheet" href="./assets/css/responsive.css" />
                    
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;