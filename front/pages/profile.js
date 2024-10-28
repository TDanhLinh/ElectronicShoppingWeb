import Head from "next/head"
import { Profile } from "../src/profile/Profile"

export default function login() {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="description"
                    content="Profile"
                />

                <link rel="stylesheet" href="/assets/css/profile.css" />
                <link rel="icon" href="/favicon.png" />

                <title>Profile</title>
            </Head>
            <Profile />
        </>
    )
}

