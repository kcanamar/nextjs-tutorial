import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    };
  });
};

// Example of grabbing data from an API
export async function getSortedPostsDataApi() {
    // Instead of the file system fetch post data from an external API endpoint
    const res = await fetch('..');
    return res.join();
};

// Example of SWR (stale-while-revalidate)
// A HTTP cahce invalidation stategy popularized by HTTP RFC 5861
// This strategy first returns the data from cache (stale)
// Second it will send the fetch request (revalidate)
// Concluding with the up-to-date data
// import useSWR from 'swr';

// function Profile() {
//     // the useSWR hook accepts a 'key' string and a 'fetcher' function
//     // 'key' is a unique identifier of the data (normally the API URL) and will be passed to the 'fetcher'
//     // 'fetcher' can be any asynchronus funtion which returns the data, either native fetch or tools like Axios will work
//     const { data, error } = useSWR('/api/user', fetch);

//     // The hook will return 2 values 'data' and 'error' based on the status of the request
//     if (error) return <div>failed to load</div>;
//     if (!data) return <div>loading...</div>;
//     return <div>hello {data.name}!</div>;
// }

// Example of quering a DataBase directly;
// import someDatabaseSDK from 'someDatabaseSDK';

// const databaseClient = someDatabaseSDK.createClient();// pass the arguments needed

// export async function getSortedPostsDataDB() {
//     // Instead of the file system fetch post data from a database
//     return databaseClient.query('SELECT posts...');
// };

// Example of ServerSideProps
// You should use 'getServerSideProps' when there is a need to pre-render a page whose data must be fetched at requesst time.
// Time to first byte (TTFB) will be slower than 'getStaticProps' due to the fct that the server must compute the result on every request
// The result cannot be cached by a CDN without extra config

export async function getServerSideProps(context) {
    return {
        props : {
            // props for your component
        },
    };
};
// Local file system example
export function getAllPostsIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    // Returns and array that looks like this:
    // [
    //     {
    //         params: {
    //             id: 'ssg-ssr'
    //         }
    //     }, 
    //     {
    //         params: {
    //             id: 'pre-rendering'
    //         }
    //     }
    // ]
    return fileNames.map((fileName) => {
        // Important the returned list MUST be an array of objects
        return {
            // Each object must have the 'params' key
            params: {
                // Contain an object with the 'id' key 
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
};

// Example of retrieving data from API endpoint
export async function getAllPostIdsAPI() {
  // instead of the file system 
  // fetch post data from an external API endpoint
  const res = await fetch("<insert api endpoint>");
  const posts = await res.json()
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
};

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metedata section
    const matterResult = matter(fileContents);

    // use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}