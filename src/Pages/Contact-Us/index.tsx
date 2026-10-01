import PageHeader from "../../global/PageHeader";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Mail, MapPin } from "lucide-react";

// وارد کردن مستقیم آیکون‌های برند از کتابخانه متریال یوآی
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

import DsButton from "../../design-system/DsButton";
import DsTypography from "../../design-system/DsTypography";

function ContactUs() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageHeader text="Contact & Profile" />

      <Box sx={{ p: { xs: 2, md: 4 }, width: "100%", maxWidth: 800 }}>
        <Card
          sx={{
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: 3,
            overflow: "hidden",
          }}
        >
          <Box sx={{ height: 120, bgcolor: "primary.dark", width: "100%" }} />

          <CardContent
            sx={{
              px: { xs: 3, md: 6 },
              pb: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: -8,
            }}
          >
            <Avatar
              src="/photo_۲۰۲۶-۰۹-۱۹_۱۳-۲۶-۰۳.jpg"
              sx={{
                width: 120,
                height: 120,
                border: "4px solid",
                borderColor: "background.paper",
                mb: 2,
                boxShadow: 2,
              }}
            />

            <DsTypography
              element="h2"
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: "bold", mb: 0.5 }}
            >
              Iman Bahmani
            </DsTypography>
            <DsTypography
              element="p"
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Frontend Developer | React Enthusiast
            </DsTypography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mb: 5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  bgcolor: "action.hover",
                  borderRadius: 3,
                }}
              >
                <MapPin className="text-blue-500" size={24} />
                <DsTypography
                  element="p"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: "medium" }}
                >
                  123 Admin Street, Tech City, USA
                </DsTypography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  bgcolor: "action.hover",
                  borderRadius: 3,
                }}
              >
                <Mail className="text-blue-500" size={24} />
                <DsTypography
                  element="p"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: "medium" }}
                >
                  eimbahmani@gmail.com
                </DsTypography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  bgcolor: "action.hover",
                  borderRadius: 3,
                }}
              >
                <TelegramIcon color="primary" sx={{ fontSize: 28 }} />
                <DsTypography
                  element="p"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: "medium" }}
                >
                  Telegram: @M_ImanBahmani
                </DsTypography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  bgcolor: "action.hover",
                  borderRadius: 3,
                }}
              >
                <InstagramIcon color="primary" sx={{ fontSize: 28 }} />
                <DsTypography
                  element="p"
                  variant="body1"
                  color="text.primary"
                  sx={{ fontWeight: "medium" }}
                >
                  Instagram: @M_ImanBahmani
                </DsTypography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <DsButton
                text="GitHub Profile"
                color="black"
                size="lg"
                icon={<GitHubIcon />}
                onClick={() =>
                  window.open("https://github.com/M-ImanBahmani", "_blank")
                }
                className="px-6"
              />
              <DsButton
                text="LinkedIn Profile"
                color="blue"
                size="lg"
                icon={<LinkedInIcon />}
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/m-iman-bahmani-a41b41335",
                    "_blank",
                  )
                }
                className="px-6"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ContactUs;
