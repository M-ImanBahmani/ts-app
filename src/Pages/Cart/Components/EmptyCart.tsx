import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DsButton from "../../../design-system/DsButton";
import DsTypography from "../../../design-system/DsTypography";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
        transition: "background-color 0.3s",
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: 1,
          border: "1px solid",
          borderColor: "divider",
          maxWidth: 480,
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: { xs: 4, md: 6 },
            textAlign: "center",
            gap: 3,
          }}
        >
          {/* دایره پس‌زمینه آیکون */}
          <Box
            sx={{
              display: "flex",
              height: 96,
              width: 96,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              bgcolor: "action.hover",
              color: "text.secondary", // رنگ آیکون را بر اساس تم لایت/دارک تنظیم می‌کند
            }}
          >
            <ShoppingCart size={48} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <DsTypography
              element="h2"
              variant="h5"
              color="text.primary"
              sx={{ fontWeight: "bold" }}
            >
              Your Cart is Empty
            </DsTypography>

            <DsTypography
              element="p"
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 350, mx: "auto", lineHeight: 1.6 }}
            >
              Looks like you haven't added anything to your cart yet. Discover
              our latest products and find what you love!
            </DsTypography>
          </Box>

          <DsButton
            text="Start Shopping"
            icon={<ShoppingCart size={18} />}
            color="blue"
            size="lg"
            className="mt-4 px-8 py-3 shadow-lg shadow-blue-500/20 rounded-xl"
            onClick={() => navigate("/app/products")}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
