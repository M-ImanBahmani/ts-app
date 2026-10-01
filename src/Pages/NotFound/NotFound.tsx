import { useNavigate } from "react-router-dom";
import { Bold, Home } from "lucide-react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DsButton from "../../design-system/DsButton";
import DsTypography from "../../design-system/DsTypography";

function NotFound() {
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
        px: 2,
        textAlign: "center",
      }}
    >
      <Box sx={{ position: "relative", mb: 4 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "8rem", sm: "12rem" },
            fontWeight: 900,
            letterSpacing: "0.1em",
            color: "text.primary",
            opacity: 0.1, // افکت سایه‌وار برای عدد 404
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) rotate(-12deg)",
            bgcolor: "primary.main",
            color: "white",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontWeight: "bold",
            boxShadow: 3,
          }}
        >
          Page Not Found
        </Box>
      </Box>

      <DsTypography
        variant="h4"
        color="text.primary"
        sx={{ fontWeight: "bold" }}
        gutterBottom
      >
        Looks like you've lost your way.
      </DsTypography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 400, mb: 5 }}
      >
        The page you are looking for doesn't exist, has been removed, or is
        temporarily unavailable.
      </Typography>

      <DsButton
        text="Back to Home"
        icon={<Home size={18} />}
        color="blue"
        size="lg"
        className="rounded-full px-8 py-3.5 shadow-lg"
        onClick={() => navigate("/app/home")}
      />
    </Box>
  );
}

export default NotFound;
