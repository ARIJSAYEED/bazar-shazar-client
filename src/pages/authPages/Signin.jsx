import { SignIn } from "@clerk/react";

const SignInPage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
