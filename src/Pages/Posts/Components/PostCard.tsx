import { Eye, Heart, ThumbsDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DsButton from "../../../design-system/DsButton";
import type { Post } from "../../../Types/Posts";

type Props = { post: Post; index: number };

export default function PostCard({ post, index }: Props) {
  const navigate = useNavigate();

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-300/60 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] dark:border-slate-700/80 dark:bg-slate-800/90 dark:hover:border-blue-500/30 dark:hover:shadow-[0_20px_40px_-15px_rgba(59,130,246,0.2)]">
      <div className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-700 dark:text-slate-400 dark:group-hover:bg-blue-900/40 dark:group-hover:text-blue-400">
        #{index + 1}
      </div>
      <div>
        <div className="mb-4 flex flex-wrap gap-2 pr-10">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
            >
              #{tag}
            </span>
          ))}
        </div>
        <h3 className="mb-3 line-clamp-2 text-xl font-extrabold text-slate-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {post.body}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700/50">
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 transition-colors hover:text-red-500">
            <Heart size={16} /> <span>{post.reactions?.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white">
            <ThumbsDown size={16} />{" "}
            <span>{post.reactions?.dislikes || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white">
            <Eye size={16} /> <span>{post.views || 0}</span>
          </div>
        </div>
        <DsButton
          text="Read More"
          size="sm"
          color="blue"
          className="rounded-xl px-4"
          onClick={() => navigate(`/app/posts/${post.id}`)}
        />
      </div>
    </div>
  );
}
