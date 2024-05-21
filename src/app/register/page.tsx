import { RegisterForm } from "@/components/authentication/Register";
import { Nav } from "@/components/landing-page/Nav";

const Register: React.FC = () => {
  return (
    <>
      <Nav />
      <RegisterForm />
    </>
  );
};

export default Register;