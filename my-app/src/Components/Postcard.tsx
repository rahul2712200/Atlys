interface Post {
    id: number;
    content: string;
    createdAt: Date;
    author:string
}
import people from "../assets/people.svg"
import emoji from "../assets/emotion-smile.svg"
import like from "../assets/like.svg"
import share from "../assets/share.png"
import comment from "../assets/comment-text.svg"
export default function PostCard({ post, alerFunction}: {post: Post, alerFunction: () => void}) {
    return (
        <div className="flex flex-col gap-2 rounded-[21px] border border-[rgba(0,0,0,0.03)] p-2 bg-[#00000008]">
        <div
          key={post.id}
          className="p-3 border border-gray-200 mt-2 rounded-xl shadow-sm bg-white flex gap-3"
        >
            <div className="flex flex-col gap-1">
                <img src={people} alt="people"></img>
            </div>
            <div className="w-full">
                <p className="text-black author-name block w-full text-left">
                    {post.author}
                </p>

                <span className="text-sm text-gray-500 date-time block w-full text-left">
                    {post.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    })}
                </span>

                <p className="content-text text-black block w-full text-left">
                    {post.content}
                </p>
            </div>

        </div>
        <div className="flex gap-3">
            <img className="cursor-pointer" onClick={alerFunction} src={like} alt="like"></img>
            <img className="cursor-pointer"  onClick={alerFunction} src={comment} alt="comment"></img>
            <img className="cursor-pointer"  onClick={alerFunction} src={share} alt="share"></img>
        </div>
    </div>
    );
  }
  