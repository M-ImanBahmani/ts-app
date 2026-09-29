import DsTypography from "../design-system/DsTypography";

function PageHeader({ text }: { text: string }) {
  return (
    <DsTypography
      element="h1"
      variant="h4"
      sx={{ fontWeight: "bold" }}
      color="text.primary"
      className="p-4" // هنوز می‌توانید از مارجین و پدینگ‌های تیلویند استفاده کنید
    >
      {text} Page
    </DsTypography>
  );
}

export default PageHeader;
