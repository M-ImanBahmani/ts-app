import { useQuery } from "@tanstack/react-query";
import { Plus, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DsButton from "../../design-system/DsButton";
import PageHeader from "../../global/PageHeader";
import { getPostsApi } from "../../Services/Post-services";
import PostCard from "./Components/PostCard";
import DsTypography from "../../design-system/DsTypography";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

function Posts() {
  const navigate = useNavigate();

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["posts-list"],
    queryFn: () => getPostsApi(),
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0f172a",
        p: { xs: 3, md: 6 },
        transition: "background-color 0.3s",
      }}
    >
      <PageHeader text="Posts Page" />

      <Box
        sx={{
          mx: "auto",
          mb: 4,
          mt: 2,
          display: "flex",
          maxWidth: "xl",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DsTypography
            element="p"
            variant="body1"
            sx={{ color: "#94a3b8", display: { xs: "none", sm: "block" } }}
          >
            Share your thoughts and ideas with the community.
          </DsTypography>

          <IconButton
            onClick={() => refetch()}
            disabled={isFetching}
            sx={{
              border: "1px solid #334155",
              bgcolor: "transparent",
              color: "#94a3b8",
              width: 40,
              height: 40,
              borderRadius: 3,
              "&:hover": {
                bgcolor: "rgba(59, 130, 246, 0.1)",
                borderColor: "#3b82f6",
                color: "#3b82f6",
              },
            }}
          >
            <RefreshCw
              size={18}
              className={isFetching ? "animate-spin text-blue-500" : ""}
            />
          </IconButton>
        </Box>

        <DsButton
          text="Create Post"
          icon={<Plus size={18} />}
          color="blue"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: "bold",
            bgcolor: "#3b82f6",
            textTransform: "none",
            boxShadow: "none",
          }}
          onClick={() => navigate("/app/posts/create-post")}
        />
      </Box>

      {isLoading ? (
        <Box
          sx={{
            mt: 8,
            display: "flex",
            justifyContent: "center",
            color: "#94a3b8",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ maxWidth: "xl", mx: "auto" }}>
          {data?.posts.map((post, index) => (
            <Grid size={{ xs: 12, md: 6, xl: 4 }} key={post.id}>
              <PostCard post={post} index={index} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Posts;
