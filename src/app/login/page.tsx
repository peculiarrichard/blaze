import { LoginForm } from "@/components/authentication/Login";
import { Nav } from "@/components/landing-page/Nav";

const Login: React.FC = () => {
  return (
    <>
      <Nav />
      <LoginForm />
    </>
  );
};

export default Login;
