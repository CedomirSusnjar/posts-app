/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function handler(req: any, res: any) {
    const { query } = req.query;
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());
    const filteredPosts = posts.filter((post: any) => post.body.includes(query))
    res.status(200).json(filteredPosts);
}