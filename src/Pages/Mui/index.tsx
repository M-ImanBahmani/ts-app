import PageHeader from "../../global/PageHeader";
import DsButton from "../../design-system/DsButton"; // مسیر فایل خودتان را تنظیم کنید
import { Save } from "lucide-react";
import Button from "@mui/material/Button";

function MuiPage() {
  return (
    <div className="p-8">
      <PageHeader text="MUI Integration" />

      <div className="mt-8 flex gap-4">
        <DsButton text="Save Data" color="green" icon={<Save size={18} />} />
        <DsButton
          text="MUI Outlined Button"
          color="blue"
          variant="outlined"
          disableRipple
        />
        <Button variant="contained">Hello world</Button>
      </div>
    </div>
  );
}

export default MuiPage;
