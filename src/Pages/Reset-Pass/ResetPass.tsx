import PageHeader from "../../global/PageHeader";
import PagesLayout from "../../global/PagesLayout";
import DsButton from "../../design-system/DsButton";
import DsTypography from "../../design-system/DsTypography";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";

function ResetPassword() {
  const navigate = useNavigate();

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      bgcolor: "background.default",
      transition: "all 0.3s ease",
      "& fieldset": { borderColor: "divider" },
      "&:hover fieldset": { borderColor: "primary.main" },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
        borderWidth: "2px",
        boxShadow: "0 0 15px rgba(37,99,235,0.15)",
      },
    },
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #0f172a inset !important",
      WebkitTextFillColor: "#fff !important",
      borderRadius: "inherit",
    },
  };

  return (
    <PagesLayout>
      <Box
        sx={{
          display: "flex",
          minHeight: "80vh",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 5,
            bgcolor: "background.paper",
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.1)",
          }}
        >
          <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}
            >
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Box
                  sx={{
                    mx: "auto",
                    mb: 3,
                    display: "flex",
                    height: 64,
                    width: 64,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                    color: "white",
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.5)",
                  }}
                >
                  <DsTypography
                    element="span"
                    variant="h5"
                    sx={{ fontWeight: "bold" }}
                  >
                    R
                  </DsTypography>
                </Box>
                <DsTypography
                  element="h1"
                  variant="h5"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Reset Password
                </DsTypography>
                <DsTypography
                  element="p"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Enter your email to reset your password.
                </DsTypography>
              </Box>

              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                sx={inputStyles}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} className="text-gray-400" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <DsButton
                type="submit"
                color="blue"
                text="Send Reset Link"
                size="lg"
                className="w-full justify-center rounded-xl py-4 font-bold text-lg shadow-lg"
              />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  underline="none"
                  onClick={() => navigate("/login")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: "bold",
                    color: "text.secondary",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PagesLayout>
  );
}

export default ResetPassword;
