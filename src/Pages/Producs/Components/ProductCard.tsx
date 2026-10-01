import { Minus, Plus, ShoppingCart, Star, Trash2 } from "lucide-react";
import type { ProductTypes } from "../../../Types/Product";
import { useCartStore } from "../../../Stores/Cart.store";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DsTypography from "../../../design-system/DsTypography";

function ProductCard({ product }: { product: ProductTypes }) {
  const { addToCart, decreaseQuantity, cartItems } = useCartStore();
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 4,
        bgcolor: "background.paper",
        boxShadow: 1,
        border: "1px solid",
        borderColor: "divider",
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 4,
          borderColor: "primary.light",
        },
        "&:hover .product-img": {
          transform: "scale(1.1)",
        },
      }}
    >
      {/* بخش تصویر */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: "75%",
          overflow: "hidden",
          bgcolor: "action.hover",
        }}
      >
        <Box
          component="img"
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="product-img"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s ease",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            borderRadius: 10,
            background: "linear-gradient(to right, #ef4444, #f43f5e)",
            px: 1.5,
            py: 0.5,
            fontSize: "0.65rem",
            fontWeight: 900,
            color: "white",
            boxShadow: 2,
            letterSpacing: 1,
          }}
        >
          {product.discountPercentage}% OFF
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            borderRadius: 10,
            bgcolor: "background.paper",
            color: "text.primary",
            px: 1.5,
            py: 0.5,
            fontSize: "0.75rem",
            fontWeight: "bold",
            boxShadow: 2,
          }}
        >
          <Star className="text-amber-400 fill-amber-400" size={14} />
          {product.rating}
        </Box>
      </Box>

      {/* مشخصات محصول */}
      <CardContent
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: 2.5,
          "&:last-child": { pb: 2.5 },
        }}
      >
        <Box
          sx={{
            mb: 1.5,
            width: "fit-content",
            borderRadius: 2,
            bgcolor: "primary.light",
            color: "primary.dark",
            px: 1.25,
            py: 0.5,
            fontSize: "0.65rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 1,
            opacity: 0.8,
          }}
        >
          {product.category}
        </Box>

        {/* ترفند line-clamp برای عنوان */}
        <DsTypography
          element="h3"
          variant="h6"
          color="text.primary"
          sx={{
            mb: 1,
            fontWeight: 900,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </DsTypography>

        {/* ترفند line-clamp برای توضیحات */}
        <DsTypography
          element="p"
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.6,
          }}
        >
          {product.description}
        </DsTypography>

        {/* قیمت و دکمه‌ها */}
        <Box
          sx={{
            mt: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pt: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <DsTypography
              element="span"
              variant="caption"
              sx={{
                fontWeight: "bold",
                color: "text.disabled",
                textDecoration: "line-through",
              }}
            >
              ${(product.price * 1.2).toFixed(2)}
            </DsTypography>
            <DsTypography
              element="span"
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: 900 }}
            >
              ${product.price}
            </DsTypography>
          </Box>

          {quantity === 0 ? (
            <IconButton
              onClick={() => addToCart(product)}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "white",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "scale(1.05)",
                  boxShadow: 3,
                },
              }}
            >
              <ShoppingCart size={20} />
            </IconButton>
          ) : (
            <Box
              sx={{
                display: "flex",
                height: 48,
                alignItems: "center",
                gap: 1.5,
                borderRadius: 3,
                bgcolor: "action.hover",
                p: 0.75,
              }}
            >
              <IconButton
                onClick={() => decreaseQuantity(product.id)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  color: "error.main",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "background.paper" },
                }}
              >
                {quantity === 1 ? <Trash2 size={16} /> : <Minus size={16} />}
              </IconButton>

              <DsTypography
                element="span"
                variant="body1"
                color="text.primary"
                sx={{ width: 24, textAlign: "center", fontWeight: "bold" }}
              >
                {quantity}
              </DsTypography>

              <IconButton
                onClick={() => addToCart(product)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  color: "primary.main",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "background.paper" },
                }}
              >
                <Plus size={16} />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
