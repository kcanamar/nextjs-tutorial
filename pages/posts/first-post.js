import Head from "next/head"
import Link from "next/link"
// import Script from "next/script"
import Layout from "../../components/layout"

export default function FirstPost(){
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            {/* Eample Script Use Case */}
            {/* <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                // Strategy controls the thrid party script load
                // a value of lazyOnload tells Next.js to load this particular script lazily during browser idle time
                strategy="lazyOnload"
                // onLoad runs any JS immediatly after the script has finished loading
                onLoad={() => console.log(`script loaded correctly, window.FB has been populated`)}
            /> */}
            <h1>First Post</h1>
            <h2>
                <Link href="/">
                    <a>Back Home</a>
                </Link>
            </h2>
        </Layout>
    )
};