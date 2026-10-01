import { useNavigate } from "react-router-dom";
import PageHeader from "../../global/PageHeader";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Package, ShoppingCart, Wallet, Users } from "lucide-react";
import DsTypography from "../../design-system/DsTypography";

const stats = [
  {
    title: "Total Products",
    value: "124",
    icon: <Package size={28} />,
    color: "#3b82f6",
    link: "/app/products",
  },
  {
    title: "New Orders",
    value: "12",
    icon: <ShoppingCart size={28} />,
    color: "#10b981",
    link: "/app/cart",
  },
  {
    title: "Wallet Balance",
    value: "$4,520",
    icon: <Wallet size={28} />,
    color: "#f59e0b",
    link: "/app/profile",
  },
  {
    title: "Total Users",
    value: "85",
    icon: <Users size={28} />,
    color: "#8b5cf6",
    link: "/app/users",
  },
];

const recentActivities = [
  {
    id: 1,
    action: "New Order Placed",
    user: "John Doe",
    date: "2 mins ago",
    status: "Success",
  },
  {
    id: 2,
    action: "Product Updated",
    user: "Admin",
    date: "1 hour ago",
    status: "Info",
  },
  {
    id: 3,
    action: "New Post Published",
    user: "Jane Smith",
    date: "3 hours ago",
    status: "Success",
  },
  {
    id: 4,
    action: "Payment Failed",
    user: "Mike J.",
    date: "1 day ago",
    status: "Error",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%" }}>
      <PageHeader text="Dashboard Overview" />

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {stats.map((stat, index) => (
            // تغییر سایز گریدها برای جلوگیری از فشردگی در دسکتاپ‌های کوچک
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Card
                onClick={() => navigate(stat.link)}
                sx={{
                  borderRadius: 4,
                  bgcolor: "background.paper",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 4 },
                }}
              >
                {/* کاهش پدینگ در موبایل و اجازه شکستن خط با flexWrap */}
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: { xs: 2, sm: 3 },
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <DsTypography
                      element="p"
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {stat.title}
                    </DsTypography>
                    <DsTypography
                      element="h3"
                      variant="h5"
                      color="text.primary"
                      sx={{ fontWeight: "bold" }}
                    >
                      {stat.value}
                    </DsTypography>
                  </Box>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: `${stat.color}20`,
                      color: stat.color,
                      display: "flex",
                    }}
                  >
                    {stat.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <DsTypography
          element="h2"
          variant="h6"
          color="text.primary"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Recent Activities
        </DsTypography>

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: 1,
            backgroundImage: "none",
          }}
        >
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                  Action
                </TableCell>
                <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                  User
                </TableCell>
                <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "text.secondary", fontWeight: "bold" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivities.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ color: "text.primary" }}>
                    {row.action}
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    {row.user}
                  </TableCell>
                  <TableCell sx={{ color: "text.primary" }}>
                    {row.date}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        bgcolor:
                          row.status === "Success"
                            ? "success.light"
                            : row.status === "Error"
                              ? "error.light"
                              : "info.light",
                        color:
                          row.status === "Success"
                            ? "success.dark"
                            : row.status === "Error"
                              ? "error.dark"
                              : "info.dark",
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Home;
