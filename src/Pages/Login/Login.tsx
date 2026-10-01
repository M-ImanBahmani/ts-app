import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../Services/login-services";
import { useForm } from "react-hook-form";
import { Lock, LogIn, User } from "lucide-react";
import DsButton from "../../design-system/DsButton";
import DsTypography from "../../design-system/DsTypography";
import PagesLayout from "../../global/PagesLayout";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";

export type loginFormData = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    defaultValues: { username: "", password: "" },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.accessToken);
      toast.success("You Logged In Successfully :)");
      navigate("/app/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const token = sessionStorage.getItem("token");
  if (token) {
    return <Navigate to={"/app/home"} />;
  }

  const onLogin = (formData: loginFormData) => {
    login({ username: formData.username, password: formData.password });
  };

  // استایل‌های پیشرفته برای زیبایی اینپوت‌ها و حل مشکل رنگ مرورگر
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      bgcolor: "background.default",
      transition: "all 0.3s ease",
      "& fieldset": {
        borderColor: "divider",
      },
      "&:hover fieldset": {
        borderColor: "primary.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
        borderWidth: "2px",
        boxShadow: "0 0 15px rgba(37,99,235,0.15)",
      },
    },
    // حل مشکل رنگ زشت مرورگر هنگام Autofill
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
            backgroundImage: "none", // برای تمیزی بیشتر در دارک‌مود
            border: "1px solid",
            borderColor: "divider",
            // ترکیب یک سایه معمولی با یک سایه رنگی برای القای حس مدرن
            boxShadow:
              "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.1)",
          }}
        >
          <CardContent sx={{ p: { xs: 4, sm: 5 } }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onLogin)}
              sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}
            >
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Box
                  sx={{
                    mx: "auto",
                    mb: 3,
                    display: "flex",
                    height: 72,
                    width: 72,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                    color: "white",
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.5)",
                    transform: "rotate(-5deg)", 
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "rotate(0deg)" },
                  }}
                >
                  <LogIn size={32} />
                </Box>
                <DsTypography
                  element="h1"
                  variant="h4"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  Welcome Back
                </DsTypography>
                <DsTypography
                  element="p"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Please enter your details to sign in.
                </DsTypography>
              </Box>

              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                {...register("username", { required: true })}
                error={!!errors.username}
                helperText={errors.username ? "Username is required" : ""}
                sx={inputStyles}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <User
                          size={20}
                          className={
                            errors.username ? "text-red-500" : "text-gray-400"
                          }
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password ? "Password is required" : ""}
                sx={inputStyles}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock
                          size={20}
                          className={
                            errors.password ? "text-red-500" : "text-gray-400"
                          }
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box
                sx={{ display: "flex", justifyContent: "flex-end", mt: -1.5 }}
              >
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  underline="none"
                  onClick={() => navigate("/reset-pass")}
                  disabled={isPending}
                  sx={{
                    fontWeight: "bold",
                    color: "text.secondary",
                    transition: "color 0.2s",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Forgot password?
                </Link>
              </Box>

              <DsButton
                type="submit"
                color="blue"
                text={isPending ? "Signing in..." : "Sign In"}
                size="lg"
                className="w-full justify-center rounded-xl py-4 font-bold text-lg shadow-lg shadow-blue-500/25"
                isLoading={isPending}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </PagesLayout>
  );
}

export default Login;
