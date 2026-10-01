import { useQuery } from "@tanstack/react-query";
import { Eye, Heart, ThumbsDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { getPostApi } from "../../../Services/Post-services";
import SharedBackButton from "../../../global/SharedBackButton";
import DsTypography from "../../../design-system/DsTypography";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";

function Details() {
  const { postId } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: [`post-details-${postId}`],
    queryFn: () => getPostApi(Number(postId)),
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ p: 6, textAlign: "center", color: "#ef4444" }}>
        Post not found!
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0f172a", p: { xs: 3, md: 6 } }}>
      <SharedBackButton to="/app/posts" text="Back to Posts" />

      <Card
        sx={{
          mx: "auto",
          mt: 4,
          maxWidth: 900,
          borderRadius: "20px",
          bgcolor: "#1e293b",
          boxShadow: "none",
          border: "1px solid #334155",
        }}
      >
        <Box sx={{ p: { xs: 4, md: 6 }, borderBottom: "1px solid #334155" }}>
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                borderRadius: "9999px",
                bgcolor: "rgba(49, 46, 129, 0.4)",
                color: "#818cf8",
                px: 2,
                py: 0.5,
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              Post #{post.id}
            </Box>
            <Box sx={{ height: 16, width: "1px", bgcolor: "#475569" }} />
            {post.tags?.map((tag, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: "9999px",
                  bgcolor: "rgba(30, 58, 138, 0.4)",
                  color: "#60a5fa",
                  px: 1.5,
                  py: 0.5,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                #{tag}
              </Box>
            ))}
          </Box>

          <DsTypography
            element="h1"
            variant="h3"
            sx={{ mb: 4, fontWeight: 900, color: "#f8fafc", lineHeight: 1.2 }}
          >
            {post.title}
          </DsTypography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  bgcolor: "#0f172a",
                  color: "#f8fafc",
                  fontWeight: "bold",
                  width: 40,
                  height: 40,
                }}
              >
                U
              </Avatar>
              <Box>
                <DsTypography
                  element="p"
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#f8fafc" }}
                >
                  User ID: {post.userId}
                </DsTypography>
                <DsTypography
                  element="p"
                  variant="caption"
                  sx={{ color: "#64748b" }}
                >
                  Published just now
                </DsTypography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: "9999px",
                border: "1px solid #334155",
                px: 2.5,
                py: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#ef4444",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                <Heart size={16} className="fill-current" />{" "}
                <span>{post.reactions?.likes || 0}</span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#94a3b8",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                <ThumbsDown size={16} />{" "}
                <span>{post.reactions?.dislikes || 0}</span>
              </Box>
              <Box
                sx={{ height: 14, width: "1px", bgcolor: "#475569", mx: 0.5 }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#94a3b8",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                <Eye size={16} /> <span>{post.views || 0} Views</span>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: { xs: 4, md: 6 } }}>
          <DsTypography
            element="p"
            variant="h6"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
              color: "#e2e8f0",
              fontSize: "1.1rem",
            }}
          >
            {post.body}
          </DsTypography>
        </Box>
      </Card>
    </Box>
  );
}

export default Details;
