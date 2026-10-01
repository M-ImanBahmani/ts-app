import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../Services/Products-services";
import ProductCard from "./Components/ProductCard";
import PageHeader from "../../global/PageHeader";
import { AlertCircle } from "lucide-react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Products() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Products-list"],
    queryFn: () => getProducts(),
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        p: { xs: 2, md: 4 },
        transition: "background-color 0.3s",
      }}
    >
      <PageHeader text="Discover Our Products" />

      {/* 1. مدیریت حالت لودینگ */}
      {isLoading && (
        <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* 2. مدیریت حالت ارور */}
      {isError && (
        <Box sx={{ mx: "auto", mt: 8, maxWidth: 500 }}>
          <Alert
            severity="error"
            icon={<AlertCircle />}
            sx={{ borderRadius: 3, p: 2, alignItems: "center" }}
          >
            <AlertTitle sx={{ fontWeight: "bold" }}>
              Oops! Something went wrong
            </AlertTitle>
            {error instanceof Error
              ? error.message
              : "Failed to load products. Please try again later."}
          </Alert>
        </Box>
      )}

      {/* 3. مدیریت حالت موفقیت‌آمیز */}
      {!isLoading && !isError && products && (
        <Grid container spacing={4} sx={{ maxWidth: "xl", mx: "auto", mt: 2 }}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Products;
