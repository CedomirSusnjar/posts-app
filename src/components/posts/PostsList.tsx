import { Post } from "./Post";

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const PostsList = ({ posts }: any) => {
    return (
        <div className='flex flex-col gap-4'>
            {posts.map((post: Post) => {
                return (
                    <Post key={post.id} userId={post.userId} title={post.title} id={0} body={post.body} />
                );
            })}
        </div>
    );
};