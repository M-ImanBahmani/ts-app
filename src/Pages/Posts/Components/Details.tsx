import { useQuery } from "@tanstack/react-query";
import { Eye, Heart, ThumbsDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { getPostApi } from "../../../Services/Post-services";
import SharedBackButton from "../../../global/SharedBackButton";

function Details() {
  const { postId } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: [`post-details-${postId}`],
    queryFn: () => getPostApi(Number(postId)),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-12 text-center text-lg text-slate-500 dark:bg-slate-900">
        Loading post details...
      </div>
    );
  }

  if (!post) {
    return <div className="p-12 text-center text-red-500">Post not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-900 sm:px-6 lg:px-8">
      {/* دکمه بازگشت */}
      <SharedBackButton to="/app/posts" text="Back to Posts" />
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
        {/* هدر مقاله */}
        <div className="border-b border-gray-100 bg-slate-50/50 p-8 dark:border-slate-700/50 dark:bg-slate-800/50 sm:p-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {/* بج شماره پست */}
            <span className="rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-black text-indigo-700 shadow-sm dark:bg-indigo-500/20 dark:text-indigo-300">
              Post #{post.id}
            </span>

            {/* خط جداکننده */}
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>

            {/* تگ‌های پست */}
            {post.tags?.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl">
            {post.title}
          </h1>

          {/* اطلاعات نویسنده و آمار */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg--to-br from-blue-500 to-indigo-600 text-white font-bold shadow-sm">
                U
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-slate-200">
                  User ID: {post.userId}
                </p>
                <p className="text-xs">Published just now</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100 dark:bg-slate-900 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-red-500">
                <Heart size={16} className="fill-current" />{" "}
                <span>{post.reactions?.likes || 0}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ThumbsDown size={16} />{" "}
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
              <div className="h-4 w-px bg-gray-300 dark:bg-slate-600"></div>
              <div className="flex items-center gap-1.5">
                <Eye size={16} /> <span>{post.views || 0} Views</span>
              </div>
            </div>
          </div>
        </div>

        {/* محتوای اصلی مقاله */}
        <div className="p-8 sm:p-12">
          <p className="whitespace-pre-line text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {post.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
