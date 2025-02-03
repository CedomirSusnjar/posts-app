export type PostProps = {
    userId: number;
    title: string;
    id: number;
    body: string;
}

export const Post = ({ userId, title, body }: PostProps) => {
    return (
        <div className="flex flex-col gap-10 border-2 w-1/2">
            <div className="flex"> 
                <div className="w-3/4">{title}</div>
                <div className="w-1/4">{userId}</div>
            </div>
            <div className="w-500">{body}</div>
        </div>
    );
};