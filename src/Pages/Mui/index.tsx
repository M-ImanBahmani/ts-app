import PageHeader from "../../global/PageHeader";
import DsButton from "../../design-system/DsButton";
import { Save } from "lucide-react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function MuiPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader text="MUI Integration" />

      <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <DsButton text="Save Data" color="green" icon={<Save size={18} />} />

        <DsButton
          text="MUI Outlined Button"
          color="blue"
          variant="outlined"
          disableRipple
        />

        <Button variant="contained" color="primary">
          Hello world
        </Button>
      </Box>
    </Box>
  );
}

export default MuiPage;
