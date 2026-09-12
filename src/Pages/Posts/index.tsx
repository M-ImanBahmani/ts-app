import { useQuery } from "@tanstack/react-query";
import { Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DsButton from "../../design-system/DsButton";
import PageHeader from "../../global/PageHeader";
import { getPostsApi } from "../../Services/Post-services";
import PostCard from "./Components/PostCard";

function Posts() {
  const navigate = useNavigate();
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["posts-list"],
    queryFn: () => getPostsApi(),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 transition-colors duration-300 dark:bg-slate-900">
      <PageHeader text="Posts" />
      <div className="mx-auto mb-8 flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="hidden text-slate-500 dark:text-slate-400 sm:block">
            Share your thoughts and ideas with the community.
          </p>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-blue-900/50 dark:hover:text-blue-400"
            title="Refresh Posts"
          >
            <RefreshCw
              size={18}
              className={`transition-all duration-500 ${isFetching ? "animate-spin text-blue-500" : "group-hover:rotate-180"}`}
            />
          </button>
        </div>
        <DsButton
          text="Create Post"
          icon={<Plus size={18} />}
          color="blue"
          className="rounded-xl px-5 py-2.5 font-bold shadow-lg shadow-blue-500/20"
          onClick={() => navigate("/app/posts/create-post")}
        />
      </div>

      {isLoading ? (
        <div className="mt-8 flex justify-center text-slate-500">
          Loading posts...
        </div>
      ) : (
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data?.posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Posts;
