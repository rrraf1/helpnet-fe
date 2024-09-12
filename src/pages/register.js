import { Grid, Card } from "@mui/material";
import AuthForm from "../components/AuthLayout";

export default function RegisterPage() {
  return (
    <Grid container justifyContent={"center"} sx={{ my: { xs: 13, sm: 5, md: 3, lg: 2 } }}>
      <Card
        sx={{
          padding: { xs: 3, sm: 4, md: 5, lg: 5.5 },
          background: "#fafafa",
          width: { xs: "80vw", sm: "60%", md: "40%", lg: "30%" },
          maxWidth: "600px",
          boxShadow: 3,
        }}
      >
        <AuthForm title="Register" isLogin={false} linkText="Sign in" linkHref="/login" />
      </Card>
    </Grid>
  );
}
