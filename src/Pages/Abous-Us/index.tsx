import PageHeader from "../../global/PageHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import DsTypography from "../../design-system/DsTypography";

const teamMembers = [
  {
    name: "Iman Bahmani",
    role: "Creator & Frontend Developer",
    img: "/photo_۲۰۲۶-۰۹-۱۹_۱۳-۲۶-۰۳.jpg",
  },
  {
    name: "Sarah Smith",
    role: "UI/UX Designer",
    img: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Mike Johnson",
    role: "Backend Developer",
    img: "https://i.pravatar.cc/150?img=12",
  },
];

function AboutUs() {
  return (
    <Box sx={{ width: "100%" }}>
      <PageHeader text="About Us" />

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Card
          sx={{
            mb: 6,
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <DsTypography
              element="h2"
              variant="h5"
              color="primary.main"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Our Mission
            </DsTypography>
            <DsTypography
              element="p"
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              We are a creative team dedicated to building the best admin
              dashboards for online stores and blogs. Our goal is to make
              managing your online business easy, fast, and secure. We believe
              in clean code, beautiful design, and a great user experience.
            </DsTypography>
          </CardContent>
        </Card>

        <DsTypography
          element="h2"
          variant="h5"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Meet Our Team
        </DsTypography>

        {/* حذف پراپ item و استفاده از پراپ size برای هماهنگی با MUI v6 */}
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  textAlign: "center",
                  py: 4,
                  bgcolor: "background.paper",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <Avatar
                  src={member.img}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid",
                    borderColor: "primary.light",
                  }}
                />
                <DsTypography
                  element="h3"
                  variant="h6"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {member.name}
                </DsTypography>
                <DsTypography
                  element="p"
                  variant="body2"
                  color="text.secondary"
                >
                  {member.role}
                </DsTypography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default AboutUs;
