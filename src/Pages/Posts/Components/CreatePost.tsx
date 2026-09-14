import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { createPostsApi } from "../../../Services/Post-services";
import { useAuthStore } from "../../../Stores/Auth.store";
import type { CreatePostForm } from "../../../Types/CreatePostForm";
import SharedBackButton from "../../../global/SharedBackButton";
import PageHeader from "../../../global/PageHeader";

function CreatePost() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePostForm>({
    defaultValues: {
      title: "",
      body: "",
      userId: user?.id || 1,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPostsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-list"] });
      toast.success("Post has been created successfully.");
      navigate("/app/posts");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create post.");
    },
  });

  const onCreatePost = (formData: CreatePostForm) => {
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
          <form className="space-y-6" onSubmit={handleSubmit(onCreatePost)}>
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                <span>Post Title</span>
                {errors.title && (
                  <span className="flex animate-pulse items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-red-600 dark:bg-red-500/20 dark:text-red-400">
                    <AlertCircle size={14} /> {errors.title.message}
                  </span>
                )}
              </label>
              <input
                id="title"
                type="text"
                placeholder="E.g., The Future of React 19..."
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900 ${
                  errors.title
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700 dark:focus:border-blue-500"
                }`}
                {...register("title", { required: "Title is required" })}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="body"
                className="flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300"
              >
                <span>Content</span>
                {errors.body && (
                  <span className="flex animate-pulse items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wide text-red-600 dark:bg-red-500/20 dark:text-red-400">
                    <AlertCircle size={14} /> {errors.body.message}
                  </span>
                )}
              </label>
              <textarea
                id="body"
                rows={8}
                placeholder="What's on your mind?..."
                className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:bg-white focus:outline-none focus:ring-4 dark:bg-slate-900/50 dark:text-white dark:focus:bg-slate-900 ${
                  errors.body
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700 dark:focus:border-blue-500"
                }`}
                {...register("body", {
                  required: "Post body is required",
                  minLength: { value: 10, message: "Min 10 characters" },
                })}
              ></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="group flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Publishing...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Publish Post
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
