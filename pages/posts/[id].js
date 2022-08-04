// To statically generate a page at a path called '/posts/<id>' where '<id>' can be dynamic
// Create a page at /pages/posts/[id].js
// The file must contain 3 essential parts
import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css"
// Import the 'getAllPostIds' 
import { getAllPostsIds, getPostData } from "../../lib/posts";


// 1. A React component to render this page
export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}/>
            </article>
        </Layout>
    )
};

// 2. 'getStaticPaths' which returns an array of possible vaules for 'id'
export async function getStaticPaths() {
    const paths = getAllPostsIds();
    // Return a list of possible values for 'id'
    return {
        paths,
        fallback: false,
    };
};

// 3. 'getStaticProps' which fetches necessary data for the post with 'id'
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        }
    };
};