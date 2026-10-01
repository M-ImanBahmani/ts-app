import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2, Send } from "lucide-react";
import { createPostsApi } from "../../../Services/Post-services";
import { useAuthStore } from "../../../Stores/Auth.store";
import type { CreatePostForm } from "../../../Types/CreatePostForm";
import SharedBackButton from "../../../global/SharedBackButton";
import DsTypography from "../../../design-system/DsTypography";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

function CreatePost() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePostForm>({
    defaultValues: { title: "", body: "", userId: user?.id || 1 },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPostsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts-list"] });
      toast.success("Post has been created successfully.");
      navigate("/app/posts");
    },
    onError: (error: Error) =>
      toast.error(error.message || "Failed to create post."),
  });

  const onCreatePost = (formData: CreatePostForm) => {
    if (!formData.title.trim() || !formData.body.trim())
      return toast.error("Please fill in all fields.");
    mutate(formData);
  };

  const inputStyles = {
    bgcolor: "#0f172a", // رنگ بسیار تاریک داخل فیلدها
    borderRadius: "12px",
    color: "#f8fafc",
    "& fieldset": { borderColor: "#334155" },
    "&:hover fieldset": { borderColor: "#475569" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: "1px" },
    "& .MuiInputBase-input::placeholder": { color: "#64748b", opacity: 1 },
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0f172a", p: { xs: 3, md: 6 } }}>
      <SharedBackButton to="/app/posts" text="Back to Posts" />

      <Card
        sx={{
          mx: "auto",
          mt: 4,
          maxWidth: 800,
          borderRadius: "20px",
          bgcolor: "#1e293b",
          boxShadow: "none",
          border: "1px solid #334155",
        }}
      >
        <Box sx={{ p: { xs: 4, md: 5 }, borderBottom: "1px solid #334155" }}>
          <DsTypography
            element="h1"
            variant="h4"
            sx={{ fontWeight: 800, color: "#f8fafc", mb: 1 }}
          >
            Create a New Post Page
          </DsTypography>
          <DsTypography element="p" variant="body1" sx={{ color: "#94a3b8" }}>
            Write something awesome to share with the platform.
          </DsTypography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(onCreatePost)}
          sx={{
            p: { xs: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <DsTypography
              element="label"
              variant="body2"
              sx={{ fontWeight: "bold", color: "#f8fafc" }}
            >
              Post Title{" "}
              {errors.title && (
                <span style={{ color: "#ef4444", fontSize: "12px" }}>
                  {" "}
                  - {errors.title.message}
                </span>
              )}
            </DsTypography>
            <OutlinedInput
              fullWidth
              placeholder="E.g., The Future of React 19..."
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              sx={inputStyles}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <DsTypography
              element="label"
              variant="body2"
              sx={{ fontWeight: "bold", color: "#f8fafc" }}
            >
              Content{" "}
              {errors.body && (
                <span style={{ color: "#ef4444", fontSize: "12px" }}>
                  {" "}
                  - {errors.body.message}
                </span>
              )}
            </DsTypography>
            <OutlinedInput
              fullWidth
              multiline
              rows={8}
              placeholder="What's on your mind?..."
              {...register("body", {
                required: "Post body is required",
                minLength: { value: 10, message: "Min 10 chars" },
              })}
              error={!!errors.body}
              sx={inputStyles}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button
              type="submit"
              disabled={isPending}
              variant="contained"
              disableElevation
              startIcon={
                isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )
              }
              sx={{
                bgcolor: "#3b82f6",
                color: "white",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                px: 4,
                py: 1.25,
                borderRadius: "12px",
                "&:hover": { bgcolor: "#2563eb" },
              }}
            >
              {isPending ? "Publishing..." : "Publish"}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default CreatePost;
