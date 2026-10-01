import {
  LoaderCircle,
  Mail,
  UserCircle,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import PageHeader from "../../global/PageHeader";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Stores/Auth.store";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import DsTypography from "../../design-system/DsTypography";

function Profile() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!sessionStorage.getItem("token")) {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "80vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              height: 96,
              width: 96,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              boxShadow: "0 0 30px rgba(59,130,246,0.15)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1px solid rgba(96, 165, 250, 0.5)",
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
            <LoaderCircle className="animate-spin text-blue-500" size={40} />
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <DsTypography
              element="h3"
              variant="h6"
              color="text.primary"
              sx={{
                fontWeight: "bold",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            >
              Loading Profile Data
            </DsTypography>
            <DsTypography
              element="p"
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Please wait while we fetch your information...
            </DsTypography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "80vh", w: "100%", p: { xs: 2, sm: 3, lg: 4 } }}>
      <PageHeader text="User Dashboard" />

      <Box
        sx={{
          mx: "auto",
          mt: 4,
          maxWidth: "md",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* هدر پروفایل */}
        <Card
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              right: -80,
              top: -80,
              height: 256,
              width: 256,
              borderRadius: "50%",
              bgcolor: "primary.light",
              opacity: 0.1,
              filter: "blur(60px)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: -80,
              bottom: -80,
              height: 256,
              width: 256,
              borderRadius: "50%",
              bgcolor: "secondary.light",
              opacity: 0.1,
              filter: "blur(60px)",
            }}
          />

          <CardContent
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
              gap: 4,
              p: 4,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={user.image}
                sx={{
                  width: 128,
                  height: 128,
                  border: "4px solid",
                  borderColor: "background.default",
                  boxShadow: 3,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  display: "flex",
                  height: 32,
                  width: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: "background.default",
                  bgcolor: "success.main",
                  color: "white",
                }}
              >
                <CheckCircle2 size={16} />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                pt: 1,
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  borderRadius: 4,
                  bgcolor: "primary.light",
                  color: "primary.dark",
                  px: 2,
                  py: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Verified Member
              </Box>
              <DsTypography
                element="h2"
                variant="h4"
                color="text.primary"
                sx={{ fontWeight: 900 }}
              >
                {user.firstName} {user.lastName}
              </DsTypography>
              <DsTypography
                element="p"
                variant="h6"
                color="text.secondary"
                sx={{ fontWeight: "medium", mt: 0.5 }}
              >
                @{user.username}
              </DsTypography>
            </Box>
          </CardContent>
        </Card>

        {/* گرید اطلاعات */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: 1,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 3, p: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: 56,
                    width: 56,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    bgcolor: "info.light",
                    color: "info.dark",
                  }}
                >
                  <Mail size={24} />
                </Box>
                <Box>
                  <DsTypography
                    element="p"
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: "bold", letterSpacing: 1 }}
                  >
                    Email Address
                  </DsTypography>
                  <DsTypography
                    element="p"
                    variant="body1"
                    color="text.primary"
                    sx={{ fontWeight: "bold", mt: 0.5 }}
                  >
                    {user.email}
                  </DsTypography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: 1,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 3, p: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    height: 56,
                    width: 56,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    bgcolor: "secondary.light",
                    color: "secondary.dark",
                  }}
                >
                  <UserCircle size={24} />
                </Box>
                <Box>
                  <DsTypography
                    element="p"
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: "bold", letterSpacing: 1 }}
                  >
                    Gender
                  </DsTypography>
                  <DsTypography
                    element="p"
                    variant="body1"
                    color="text.primary"
                    sx={{
                      fontWeight: "bold",
                      mt: 0.5,
                      textTransform: "capitalize",
                    }}
                  >
                    {user.gender}
                  </DsTypography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Card
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#0f172a",
                color: "white",
                boxShadow: 4,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  borderBottom: "1px solid #1e293b",
                  bgcolor: "#020617",
                  px: 3,
                  py: 1.5,
                }}
              >
                <Terminal size={16} className="text-slate-500" />
                <DsTypography
                  element="span"
                  variant="caption"
                  sx={{ fontFamily: "monospace", color: "#64748b" }}
                >
                  auth_token.sh
                </DsTypography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                <DsTypography
                  element="p"
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: "#4ade80",
                    mb: 1,
                    opacity: 0.8,
                  }}
                >
                  Session Token (Encrypted)
                </DsTypography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontFamily: "monospace",
                    color: "#4ade80",
                  }}
                >
                  <span className="text-slate-600">$</span>
                  <span className="truncate">
                    {user.accessToken?.substring(0, 40)}...
                  </span>
                  <Box
                    sx={{
                      height: 16,
                      width: 8,
                      bgcolor: "#4ade80",
                      animation: "pulse 1s infinite",
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile;
