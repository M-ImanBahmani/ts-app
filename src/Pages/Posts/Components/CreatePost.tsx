import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageHeader from "../../../global/PageHeader";
import SharedBackButton from "../../../global/SharedBackButton";
import { createPostsApi } from "../../../Services/Post-services";
import { useAuthStore } from "../../../Stores/Auth.store";
import type { CreatePostForm } from "../../../Types/CreatePostForm";

function CreatePost() {
  const { user } = useAuthStore();

  const initialFormData = {
    title: "",
    body: "",
    userId: user?.id || 1,
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<CreatePostForm>(initialFormData);

  const { mutate, isPending } = useMutation({
    mutationFn: createPostsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-list"] });
      toast.success("Post has been created sduccessfuly.");
      navigate("/app/posts");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.body.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    mutate({
      title: formData.title,
      body: formData.body,
      userId: formData.userId,
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 transition-colors duration-300 dark:bg-slate-900 sm:px-6 lg:px-8">
      <SharedBackButton to="/app/posts" text="Back to Posts" />

      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
        <div className="border-b border-gray-100 bg-slate-50/50 px-8 py-6 dark:border-slate-700/50 dark:bg-slate-800/50">
          <PageHeader text="Create a New Post" />
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Write something awesome to share with the platform.
          </p>
        </div>

        <div className="p-8 sm:p-12">
          {/* فرم خود را به جای این div قرار دهید و رویداد onSubmit را هندل کنید */}
          <form className="space-y-6" onSubmit={(e) => onSubmit(e)}>
            {/* فیلد عنوان */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Post Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                id="title"
                placeholder="E.g., The Future of React 19..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
              />
            </div>

            {/* فیلد متن پست */}
            <div className="space-y-2">
              <label
                htmlFor="body"
                className="text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                Content
              </label>
              <textarea
                id="body"
                rows={8}
                placeholder="What's on your mind?..."
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:focus:border-blue-500 dark:focus:bg-slate-900 dark:focus:ring-blue-500/20"
              ></textarea>
            </div>

            {/* بخش دکمه ثبت */}
            <div className="flex justify-end pt-4">
              {/* تغییرات دکمه برای هندل کردن وضعیت لودینگ */}
              <button
                type="submit"
                disabled={isPending}
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
