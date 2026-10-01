import PageHeader from "../../global/PageHeader";
import { useCartStore } from "../../Stores/Cart.store";
import ProductCard from "../Producs/Components/ProductCard";
import EmptyCart from "./Components/EmptyCart";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function Cart() {
  const { cartItems } = useCartStore();

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
        transition: "background-color 0.3s",
      }}
    >
      <PageHeader text="Cart" />

      <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
        <Grid container spacing={4} sx={{ maxWidth: "lg", mx: "auto", mt: 2 }}>
          {cartItems.map((item) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={item.id}>
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Cart;
